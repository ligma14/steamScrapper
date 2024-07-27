'use server'
import { scrapeSteamProduct } from "../scrapper";

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
        const scrapedProduct = await scrapeSteamProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}