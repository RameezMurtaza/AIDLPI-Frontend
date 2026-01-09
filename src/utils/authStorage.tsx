import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export const AUTH_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  mustChangePassword: 'mustChangePassword',
  user: 'user',
  onboardingDone: 'onboardingDone',
};

export async function getAuthState() {
  const [accessToken, refreshToken, mustChangePassword, onboardingDone] =
    await Promise.all([
      AsyncStorage.getItem(AUTH_KEYS.accessToken),
      AsyncStorage.getItem(AUTH_KEYS.refreshToken),
      AsyncStorage.getItem(AUTH_KEYS.mustChangePassword),
      AsyncStorage.getItem(AUTH_KEYS.onboardingDone),
    ]);

    console.log('Async Storage:', 'accessToken:',accessToken, 'refreshToken:', refreshToken, 'mustChangePassword', mustChangePassword, 'onboardingDone', onboardingDone)


  return {
    accessToken,
    refreshToken,
    mustChangePassword, // "true" | "false" | null
    onboardingDone,     // "true" | null
  };
}

export async function setTokens(tokens: AuthTokens) {
  const pairs: [string, string][] = [[AUTH_KEYS.accessToken, tokens.accessToken]];
  if (tokens.refreshToken) pairs.push([AUTH_KEYS.refreshToken, tokens.refreshToken]);
  await AsyncStorage.multiSet(pairs);
}

export async function clearTokens() {
  await AsyncStorage.multiRemove([
    AUTH_KEYS.accessToken,
    AUTH_KEYS.refreshToken,
    AUTH_KEYS.mustChangePassword,
  ]);
}
