// src/utils/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthTokens = async (tokens: {
  accessToken: string;
  refreshToken: string;
  user: any;
  mustChangePassword: boolean;
}) => {
  await AsyncStorage.multiSet([
    ['accessToken', tokens.accessToken],
    ['refreshToken', tokens.refreshToken],
    ['user', JSON.stringify(tokens.user)],
    ['mustChangePassword', String(tokens.mustChangePassword)],
  ]);
};

export const getAuthState = async () => {
  const values = await AsyncStorage.multiGet([
    'accessToken',
    'refreshToken',
    'mustChangePassword',
    'onboardingDone',
  ]);

  const obj: any = {};
  values.forEach(([key, value]) => (obj[key] = value));
  return obj;
};

export const clearTokens = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'mustChangePassword']);
};
