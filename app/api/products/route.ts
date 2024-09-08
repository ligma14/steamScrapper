import { NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Helper function to extract numeric price from string
function extractPrice(priceText: string): number {
  const match = priceText.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

// GET handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const start = (page - 1) * limit;

  try {
    const cookieStore = cookies();
    const supabase = createClient();

    const steamRes = await axios.get(`https://steamcommunity.com/market/search/render/?query=&start=${start}&count=${limit}&norender=1`);
    const steamData = steamRes.data;

    if (!steamData.results || !Array.isArray(steamData.results)) {
      throw new Error('Invalid data structure from Steam API');
    }

    const products = steamData.results.map((item: any) => ({
      steam_id: item.asset_description?.classid || item.name,
      quality: item.asset_description?.background_color === '' ? 'q-common'
        : item.asset_description?.background_color === '3C352E' ? 'q-legendary'
        : item.asset_description?.background_color === '42413e' ? 'q-rare'
        : 'q-unknown',
      name: item.name,
      sell_price: extractPrice(item.sell_price_text),
      buy_price: extractPrice(item.sell_price_text),
      description: item.asset_description?.type || '',
      image_url: item.asset_description?.icon_url 
        ? `https://community.akamai.steamstatic.com/economy/image/${item.asset_description.icon_url}/360fx360f`
        : '',
      item_link: `https://steamcommunity.com/market/listings/${item.asset_description?.appid || '753'}/${encodeURIComponent(item.name)}`,
      updated_at: new Date().toISOString()
    }));

    const { data: insertedData, error } = await supabase
      .from('scrapeditems')
      .upsert(products, { onConflict: 'steam_id' })
      .select();

    if (error) {
      throw new Error(`Failed to insert/update products: ${error.message}`);
    }

    return NextResponse.json({
      products: insertedData,
      totalCount: steamData.total_count,
      page,
      limit
    });

  } catch (error: any) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ 
      error: 'An error occurred',
      message: error.message
    }, { status: 500 });
  }
}