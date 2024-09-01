import { NextResponse } from 'next/server';
import axios from 'axios';

// In-memory cache with timeout
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TIMEOUT = 10 * 60 * 1000; // Cache for 10 minutes

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

// GET handler
export async function GET() {
  try {
    const res = await axios.get('https://steamcommunity.com/market/search/render/?query=&start=0&count=5&norender=1');
    const data = res.data;

    const products = data.results.map((item: any, i: number) => ({
      id: i + 1,
      quality: item.asset_description.background_color === '' ? 'q-common'
        : item.asset_description.background_color === '3C352E' ? 'q-legendary'
        : item.asset_description.background_color === '42413e' ? 'q-rare'
        : '',
      name: item.name,
      sellInfo: item.sell_price_text,
      buyInfo: '',
      description: '',
      picUrl: `https://community.akamai.steamstatic.com/economy/image/${item.asset_description.icon_url}/360fx360f`,
      itemLink: `https://www.steamcommunity.com/market/listings/${item.asset_description.appid}/${encodeURI(item.name)}`
    }));

    return NextResponse.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
