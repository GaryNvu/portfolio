import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySession } from './lib/auth';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthEndpoint = pathname === '/api/auth/login' || pathname === '/api/auth/logout';

  if (pathname.startsWith('/api/')) {
    if (isAuthEndpoint) return NextResponse.next();

    const isAuthenticated = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
    return isAuthenticated
      ? NextResponse.next()
      : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isLoginPage = /^\/login\/?$/.test(pathname);
  const isAuthenticated = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|_vercel|.*\\..*).*)'
};