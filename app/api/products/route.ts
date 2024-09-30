import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@/utils/supabase/server';

const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 10000; // 10 seconds

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// GET handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const start = (page - 1) * limit;

  try {
    const steamRes = await axios.get(`https://steamcommunity.com/market/search/render/?query=&start=${start}&count=${limit}&norender=1`);
    const steamData = steamRes.data;

    if (!steamData.results || !Array.isArray(steamData.results)) {
      throw new Error('Invalid data structure from Steam API');
    }

    const supabase = createClient();

    const steamIds = steamData.results.map((item) => item.asset_description?.classid || item.name);
    const { data: existingItems, error: fetchError } = await supabase
      .from('scrapeditems')
      .select('steam_id, highest_buy_order, lowest_sell_order')
      .in('steam_id', steamIds);

    if (fetchError) throw new Error(`Supabase fetch error: ${fetchError.message}`);

    const existingItemsMap = new Map(existingItems.map(item => [item.steam_id, item]));

    const products = steamData.results.map((item: any) => {
      const existingItem = existingItemsMap.get(item.asset_description?.classid || item.name);
      return {
        steam_id: item.asset_description?.classid || item.name,
        quality: item.asset_description?.background_color === '' ? 'q-common'
          : item.asset_description?.background_color === '3C352E' ? 'q-legendary'
          : item.asset_description?.background_color === '42413e' ? 'q-rare'
          : 'q-unknown',
        name: item.name,
        sell_price: parseFloat(item.sell_price_text.substring(1)),
        buy_price: existingItem ? existingItem.highest_buy_order : 0,
        description: item.asset_description?.type || '',
        image_url: item.asset_description?.icon_url 
          ? `https://community.akamai.steamstatic.com/economy/image/${item.asset_description.icon_url}/360fx360f`
          : '',
        item_link: `https://steamcommunity.com/market/listings/${item.asset_description.appid}/${encodeURIComponent(item.name)}`,
        updated_at: new Date().toISOString(),
        app_id: item.asset_description?.appid || ''
      };
    });

    return NextResponse.json({
      products,
      totalCount: steamData.total_count,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch products' }, { status: 500 });
  }
}

// POST handler (for updating market data)
async function fetchMarketLoadOrderSpread(url: string): Promise<number | null> {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    let marketLoadOrderSpreadNumber = null;

    $('script').each((index, element) => {
      const scriptContent = $(element).html() || '';
      const match = scriptContent.match(/Market_LoadOrderSpread\s*\(\s*(\d+)\s*\)/);
      if (match) {
        marketLoadOrderSpreadNumber = parseInt(match[1]);
        return false;
      }
    });

    return marketLoadOrderSpreadNumber;
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return null;
  }
}

async function updateProducts() {
  const supabase = createClient();

  let count = 0;
  let hasMore = true;

  while (hasMore) {
    // Fetch items without itemname_id
    const { data: itemsWithoutId, error: fetchError1 } = await supabase
      .from('scrapeditems')
      .select('steam_id, item_link, name')
      .is('itemname_id', null)
      .range(count, count + BATCH_SIZE - 1);

    if (fetchError1) throw fetchError1;

    if (itemsWithoutId && itemsWithoutId.length > 0) {
      for (const item of itemsWithoutId) {
        if (!item.name) {
          console.log(`Skipping item ${item.steam_id} due to missing name`);
          continue;
        }
        const marketLoadOrderSpreadNumber = await fetchMarketLoadOrderSpread(item.item_link);
        
        if (marketLoadOrderSpreadNumber !== null) {
          const { error: updateError } = await supabase
            .from('scrapeditems')
            .update({ itemname_id: marketLoadOrderSpreadNumber })
            .eq('steam_id', item.steam_id);

          if (updateError) throw updateError;

          console.log(`Updated item ${item.steam_id} with itemname_id ${marketLoadOrderSpreadNumber}`);
        } else {
          console.log(`Skipped item ${item.steam_id} due to null value`);
        }

        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    // Fetch items with itemname_id to update market data
    const { data: itemsWithId, error: fetchError2 } = await supabase
      .from('scrapeditems')
      .select('steam_id, itemname_id, name')
      .not('itemname_id', 'is', null)
      .range(count, count + BATCH_SIZE - 1);

    if (fetchError2) throw fetchError2;

    if (itemsWithId && itemsWithId.length > 0) {
      const updatedProducts = [];

      for (const item of itemsWithId) {
        if (!item.name) {
          console.log(`Skipping item ${item.steam_id} due to missing name`);
          continue;
        }
        const url = `https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=${item.itemname_id}&two_factor=0`;
        const response = await axios.get(url);
        const jsonData = response.data;

        const processedProduct = {
          steam_id: item.steam_id,
          name: item.name,
          lowest_sell_order: jsonData.lowest_sell_order / 100,
          highest_buy_order: jsonData.highest_buy_order / 100,
          updated_at: new Date().toISOString()
        };

        updatedProducts.push(processedProduct);
        
        await sleep(DELAY_BETWEEN_BATCHES);
      }

      if (updatedProducts.length > 0) {
        const { error: upsertError } = await supabase
          .from('scrapeditems')
          .upsert(updatedProducts, { onConflict: 'steam_id' });

        if (upsertError) throw upsertError;

        console.log(`Updated market data for ${updatedProducts.length} items`);
      }
    }

    count += BATCH_SIZE;
    if ((itemsWithoutId?.length || 0) + (itemsWithId?.length || 0) < BATCH_SIZE) {
      hasMore = false;
    }

    console.log(`Processed ${count} items total`);
    await sleep(DELAY_BETWEEN_BATCHES);
  }

  return {
    success: true,
    message: 'Products successfully fetched, processed, and updated',
    updatedCount: count
  };
}

export async function POST(request: Request) {
  try {
    const result = await updateProducts();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
      message: 'Failed to update products'
    }, { status: 500 });
  }
}