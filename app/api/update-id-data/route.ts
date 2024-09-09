import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const STEAM_URL = 'https://steamcommunity.com/market/listings/730/Dreams%20%26%20Nightmares%20Case';

export async function GET() {
  try {
    console.log(`Fetching data from: ${STEAM_URL}`);
    const response = await fetch(STEAM_URL, { 
      headers: { 'User-Agent': 'Mozilla/5.0' } // Mimic a browser request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`Successfully fetched HTML. Length: ${html.length} characters`);

    const $ = cheerio.load(html);
    
    let marketLoadOrderSpreadNumber = null;

    // Search through all script tags
    $('script').each((index, element) => {
      const scriptContent = $(element).html() || '';
      const match = scriptContent.match(/Market_LoadOrderSpread\s*\(\s*(\d+)\s*\)/);
      if (match) {
        marketLoadOrderSpreadNumber = parseInt(match[1]);
        return false; // Break the loop if found
      }
    });

    console.log(`Market_LoadOrderSpread number: ${marketLoadOrderSpreadNumber}`);

    // Return structured data
    return NextResponse.json({
      success: true,
      data: {
        marketLoadOrderSpreadNumber
      }
    });

  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}
