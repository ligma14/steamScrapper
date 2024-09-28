import { NextResponse } from 'next/server';

async function updateMarketData() {
  try {
    console.log(`Fetching from: ${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorBody = await response.text(); // Log the response body
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
    const result = await response.json();
    console.log('Market data update result:', result);
    return result;
  } catch (error) {
    console.error('Error updating market data:', error);
    throw error;
  }
}

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