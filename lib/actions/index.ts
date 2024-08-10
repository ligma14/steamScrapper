'use server'
import { connectToDB } from "../mongoose";
import { scrapeSteamProduct } from "../scrapper";
import { generateProducts } from "../buildData";

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
        connectToDB();

        const scrapedProduct = await scrapeSteamProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}
