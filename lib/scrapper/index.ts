import { random } from "gsap";
import axios from 'axios';
import * as cheerio from 'cheerio'
import { config } from "process";
import { headers } from "next/headers";

export async function scrapeSteamProduct(url: string) {
    if(!url) return;


    // BRIGHTDATA FUNCTIONALITY (WIP)
    // const username = String(process.env.BRIGHTDATA_USERNAME);
    // const password = String(process.env.BRIGHTDATA_PASSWORD);
    // const port = ''; // EMPTY
    // const session_id = (1000000 * Math.random()) | 0
    // const options = {
    //     auth: {
    //         username: `${username}-session-${session_id}`,
    //         password,
    //     },
    //     host: 'brd.superproxy.io',
    //     port,
    //     rejectUnauthorized: false,
    // }

    try {
        // Fetch the market page
        console.log('Getting a response...')
        const response = await axios.get(url);

        console.log(response.data, response.config)
    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}