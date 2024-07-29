import { random } from "gsap";
import axios from 'axios';
import * as cheerio from 'cheerio'
import { config } from "process";
import { headers } from "next/headers";
import { extractPrice } from "../utils";

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
    // const csfIndex = {
    //     // Indexes for CSFloat website search
    //     '1': 'Desert Eagle',
    //     '2': 'Dual Berettas',
    //     '3': 'Five-Seven',
    //     '4': 'Glock',
    //     '5': '',
    //     '6': '',
    //     '7': 'AK-47',
    //     '8': 'AUG',
    //     '9': 'AWP',
    //     '10': 'FAMAS',
    //     '11': 'G3SG1',
    //     '13': 'Galil',
    //     '14': 'M249',
    //     '16': 'M4A4',
    //     '17': 'Mac-10',
    //     '18': '',
    //     '19': 'P-90',
    //     '20': 'G3SG1',
    //     '21': 'G3SG1',
    //     '22': 'G3SG1',
    //     '23': 'MP5-SD',
    //     '24': 'MP5-SD',
    //     '25': 'MP5-SD',
    //     '26': 'MP5-SD',
    //     '27': 'MP5-SD',
    //     '28': 'MP5-SD',
    //     '29': 'MP5-SD',
    //     '30': 'MP5-SD',
    //     '31': 'MP5-SD',
    //     '32': 'MP5-SD',
    // }

    

    try {
        // Fetch the market page
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        console.log(response.data, response.config)
        const title = $('').text(); // Item title   

        // extractPrice(); function is used to get the integer number inside a certain element, it clears it up from other symbols
        // For example you can use multiple elements to access something inside a nested html object
        const currentPrice = extractPrice(
            // Put elements here from which you want to extract price
            $(''),
            
        );
    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}