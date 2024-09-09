import { NextResponse } from 'next/server';
import cron from 'node-cron';

async function updateMarketData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Market data update result:', result);
    return result;
  } catch (error) {
    console.error('Error updating market data:', error);
    throw error;
  }
}

// Schedule the task to run every 20 minutes
cron.schedule('*/20 * * * *', updateMarketData);

export async function GET() {
  try {
    const result = await updateMarketData();
    return NextResponse.json({ message: 'Market data update initiated', result });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ 
      error: 'An error occurred',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}