import axios from 'axios';
import * as cheerio from 'cheerio';
import { headers } from 'next/headers';
import { stringify } from 'querystring';

export const generateProducts = async () => {


try {
  
  // Initial request to get the basic data (specifically item names)
  const response1 = await axios.get('https://www.steamcommunity.com/market/search/render/?query=&start=0&count=2&norender=1');
  const htmlData = response1.data;

  // Process the data
  const products = Array.from(htmlData.results).map((el,index)=>({
    "id": index+1, 
    "quality": htmlData.asset_description.background_color,
    "name": htmlData.name, 
    "buyInfo": '',
    "sellInfo": '',
    "description": '', 
    "picUrl": '',
    "itemLink": `https://www.steamcommunity.com/market/listings/${htmlData.asset_description.appid}/${encodeURI(htmlData.name)}`
  }));

  // Perform additional request to retrieve the missing data (requesting an individual product page for each product)
  const productDetailsPromises = products.map(async (product) => {
    try {
      const response2 = await axios.get(product.itemLink); 
      const extraInfo = response2.data;
      const $ = cheerio.load(extraInfo);

      // Trying to parse response2 to get additional data      
      product.picUrl = $('.market_listing_largeimage').children('img').eq(0).attr('src')!;
    
      return {...product};
    } catch (error) {
      console.error(`Error fetching details for product ${product.name, product.id}`, error)
      return product
    }
  })

  // Wait for all aditional requests to complete
  const productsMain = await Promise.all(productDetailsPromises);

  // Store the generated data in localStorage
  localStorage.setItem('cachedProducts', JSON.stringify(products));
  return productsMain;
} catch (error) {
  console.log(error);

  // Retrieve the cached data from localStorage
  const cachedProducts = localStorage.getItem('cachedProducts');
  if (cachedProducts){
    return JSON.parse(cachedProducts);
  }

  // Return an empty array in case of an error
  return [];
}

};