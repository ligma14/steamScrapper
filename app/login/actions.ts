import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const steamLogin_url_params = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': `${process.env.NEXT_PUBLIC_API_URL}/api/auth/steam/return`,
    'openid.realm': process.env.NEXT_PUBLIC_API_URL ?? '',
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
};

const steamLoginUrl = `https://steamcommunity.com/openid/login?${new URLSearchParams(steamLogin_url_params).toString()}`;

export async function initiateSteamLogin() {
    try {
        const supabase = createClient(cookies());
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'steam' as any, // Type assertion to bypass type check
            options: {
                redirectTo: steamLoginUrl,
                skipBrowserRedirect: true // Add this line
            }
        });

        if (error) throw error;

        return { success: true, url: data.url };
    } catch (error) {
        console.error('Steam login error:', error);
        return { success: false, error: 'Failed to initiate Steam login' };
    }
}


