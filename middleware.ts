// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse} from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow unauthenticated access to the home page
  if (req.nextUrl.pathname === '/') {
    return res;
  }

  // Require authentication for the dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return await updateSession(req);
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};