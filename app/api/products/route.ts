import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const cache = new Map();

async function cachedFetch(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await axios.get(url);
  cache.set(url, response.data);
  return response.data;
}

export async function GET() {
  try {
    // Fetch data from an external API
    const res = await fetch('https://steamcommunity.com/market/search/render/?query=&start=0&count=5&norender=1');
    const data = await res.json();

    // Data manipulation
    const initialData = data.results
    const products = Array.from(initialData).map((el,i)=>({
      "id": i+1, 
      "quality": initialData[i].asset_description.background_color === '' ? 'q-common' 
      : initialData[i].asset_description.background_color === '3C352E' ? 'q-legendary'
      : initialData[i].asset_description.background_color === '42413e' ? 'q-rare'
      : initialData[i].asset_description.background_color === '3C352E' ? 'q-legendary'
      : initialData[i].asset_description.background_color,
      "name": initialData[i].name, 
      "buyInfo": '',
      "sellInfo": initialData[i].sell_price_text,
      "description": '', 
      "picUrl": '',
      "itemLink": `https://www.steamcommunity.com/market/listings/${initialData[i].asset_description.appid}/${encodeURI(initialData[i].name)}`
    }));

      // Perform additional request to retrieve the missing data (requesting an individual product page for each product)
    const productDetailsPromises = products.map(async (product) => {
      try {
        const res = await axios.get(product.itemLink); 
        const extraInfo = res.data;
        const $ = cheerio.load(extraInfo);
        console.log('Performing cheerio web scrapping, response status is:', res.status, res.statusText)
        // Trying to parse response2 to get additional data      
        product.picUrl = $('.market_listing_largeimage').children('img').eq(0).attr('src')!;
 
      
        return {...product};
      } catch (error) {
        console.error(`Error fetching details for product ${product.name, product.id}`, error)
        return product
      }
    })

    const productsMain = await Promise.all(productDetailsPromises);
    
    // Return the data as a JSON response
    console.log(productsMain)
    return NextResponse.json(productsMain);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}