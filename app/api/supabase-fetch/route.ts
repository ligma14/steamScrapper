import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createClient();

    const { data, error } = await supabase
      .from('steam_items')
      .select('*')
      .limit(5);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}