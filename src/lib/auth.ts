import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

export const SESSION_COOKIE = 'savings_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSigningKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

export async function createSessionToken() {
  const key = getSigningKey();
  if (!key) throw new Error('SESSION_SECRET must contain at least 32 characters.');

  return new SignJWT({ sub: 'owner' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(key);
}

export async function verifySession(token?: string) {
  const key = getSigningKey();
  if (!key || !token) return false;

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    return payload.sub === 'owner';
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};