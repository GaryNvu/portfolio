import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attemptsByIp = new Map<string, { count: number; expiresAt: number }>();

function matchesSecret(provided: string, expected: string) {
  const providedHash = createHash('sha256').update(provided).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(providedHash, expectedHash);
}

export async function POST(request: NextRequest) {
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const attempt = attemptsByIp.get(clientIp);

  if (attempt && attempt.expiresAt <= now) attemptsByIp.delete(clientIp);
  const currentAttempt = attemptsByIp.get(clientIp);
  if (currentAttempt && currentAttempt.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  if (!username || !password || !process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    return NextResponse.json({ error: 'Authentication is not configured.' }, { status: 503 });
  }

  let credentials: { username?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const providedUsername = typeof credentials.username === 'string' ? credentials.username : '';
  const providedPassword = typeof credentials.password === 'string' ? credentials.password : '';
  const valid = matchesSecret(providedUsername, username) && matchesSecret(providedPassword, password);

  if (!valid) {
    attemptsByIp.set(clientIp, {
      count: (currentAttempt?.count ?? 0) + 1,
      expiresAt: currentAttempt?.expiresAt ?? now + WINDOW_MS,
    });
    return NextResponse.json({ error: 'Incorrect identifier or password.' }, { status: 401 });
  }

  attemptsByIp.delete(clientIp);
  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: 'Authentication is not configured.' }, { status: 503 });
  }
}