import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(cookies());
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const response = await axios.get(`http://steamcommunity.com/inventory/${user.id}/730/2?l=english&count=5000`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
}