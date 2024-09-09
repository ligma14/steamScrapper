import { NextResponse } from 'next/server';
import cron from 'node-cron';

async function updateMarketData() {
  try {
    const response = await fetch('http://localhost:3000/api/products', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log('Market data update result:', result);
  } catch (error) {
    console.error('Error updating market data:', error);
  }
}

// Schedule the task to run every 20 minutes
cron.schedule('*/20 * * * *', updateMarketData);

export async function GET() {
  // This endpoint can be used to manually trigger the update
  await updateMarketData();
  return NextResponse.json({ message: 'Market data update initiated' });
}