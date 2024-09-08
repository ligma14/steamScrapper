import { supabase } from '@/lib/supabase';

export async function scrapeSteamProduct(url: string) {
  if(!url) return;

  try {
    // Your existing scraping logic here
    const scrapedData = {
      name: 'Example Item',
      quality: 'common',
      sell_price: 10.99,
      buy_price: 9.99,
      description: 'An example item',
      image_url: 'https://example.com/image.jpg',
      item_link: url
    };

    const { data, error } = await supabase
      .from('steam_items')
      .insert([scrapedData])
      .select();

    if (error) throw error;

    return data[0];
  } catch (error: any) {
    throw new Error(`Failed to scrape and store: ${error.message}`);
  }
}