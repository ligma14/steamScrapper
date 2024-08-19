import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// In-memory cache with timeout
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TIMEOUT = 10 * 60 * 1000; // Cache for 10 minutes

// Delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch data with caching
async function cachedFetch(url: string) {
  const cached = cache.get(url);
  const now = Date.now();

  if (cached && (now - cached.timestamp < CACHE_TIMEOUT)) {
    return cached.data;
  }

  const response = await axios.get(url);
  const data = response.data;
  cache.set(url, { data, timestamp: now });

  return data;
}

// Fetch and parse product details
async function fetchProductDetails(product: any) {
  try {
    const html = await cachedFetch(product.itemLink);
    const $ = cheerio.load(html);

    product.picUrl = $('.market_listing_largeimage img').attr('src') || '';
    product.description = $('#market_listing_item_name').text() || '';

    return product;
  } catch (error) {
    console.error(`Error fetching details for product ${product.name} (ID: ${product.id}):`, error);
    return product; // Return the original product even if an error occurs
  }
}

// Process products in batches to limit concurrent requests
async function processProductsInBatches(products: any[], batchSize: number, delayMs: number) {
  const result = [];

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const processedBatch = await Promise.all(batch.map(fetchProductDetails));
    result.push(...processedBatch);

    if (i + batchSize < products.length) {
      await delay(delayMs); // Delay between batches
    }
  }

  return result;
}

// GET handler
export async function GET() {
  try {
    const res = await axios.get('https://steamcommunity.com/market/search/render/?query=&start=0&count=5&norender=1');
    const data = res.data;

    const products = data.results.map((item: any, i: number) => ({
      id: i + 1,
      quality:   item.asset_description.background_color === '' ? 'q-common'
      : item.asset_description.background_color === '3C352E' ? 'q-legendary'
      : item.asset_description.background_color === '42413e' ? 'q-rare'
      : item.asset_description.background_color === '3C352E' ? 'q-legendary'
      : '',
      name: item.name,
      sellInfo: item.sell_price_text,
      description: '',
      picUrl: '',
      itemLink: `https://www.steamcommunity.com/market/listings/${item.asset_description.appid}/${encodeURI(item.name)}`
    }));

    const processedProducts = await processProductsInBatches(products, 2, 5000); // Process in batches of 2 with 5s delay

    return NextResponse.json(processedProducts);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
