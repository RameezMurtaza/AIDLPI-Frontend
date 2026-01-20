import AsyncStorage from '@react-native-async-storage/async-storage';

const getCategoryKey = (categoryKey: string) =>
  `CONTENT_LIBRARY_CACHE_${categoryKey}`;

export const saveContentList = async (
  categoryKey: string,
  content: any[],
) => {
  await AsyncStorage.setItem(
    getCategoryKey(categoryKey),
    JSON.stringify(content),
  );
};

export const getCachedContentList = async (categoryKey: string) => {
  const data = await AsyncStorage.getItem(getCategoryKey(categoryKey));
  return data ? JSON.parse(data) : [];
};
