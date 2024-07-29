import { random } from "gsap";
import axios from 'axios';
import * as cheerio from 'cheerio'
import { config } from "process";
import { headers } from "next/headers";
import { extractPrice } from "../utils";
import { connectToDB } from "../mongoose";

export async function scrapeSteamProduct(url: string) {
    if(!url) return;

    try {
        // DB connection
        // connectToDB();

        // Fetch the market page
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
 
  

        console.log($);

    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}