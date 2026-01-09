import { setTokens, clearTokens } from './authStorage';

const BASE_URL = 'http://10.199.17.57:3000';
const ADMIN_KEY = 'z9srWb95rY5YeiJy9GuchsD9VI3C4D';

/**
 * Calls /auth/refresh using refreshToken and returns fresh tokens.
 * Assumes backend returns something like:
 * { accessToken: "...", refreshToken?: "...", mustChangePassword?: boolean, user?: {...} }
 *
 * If your backend expects refreshToken in body, this matches your pattern.
 * If your backend expects it in header/cookie, tell me and I’ll adjust.
 */
export async function refreshSession(refreshToken: string) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': ADMIN_KEY,
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    await clearTokens();
    throw new Error(data?.message || 'Refresh failed');
  }

  // Store new tokens
  await setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken ?? refreshToken, // keep old if backend doesn’t rotate
  });

  console.log(data)

  
  return data;
}
