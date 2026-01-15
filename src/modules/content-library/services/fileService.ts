import RNFS from 'react-native-fs';
import { logError } from '../utils/logger';

export const getPdfPath = (fileName: string) =>
  `${RNFS.DocumentDirectoryPath}/${fileName}`;

export const isPdfDownloaded = async (fileName: string) => {
  try {
    const path = getPdfPath(fileName);
    return await RNFS.exists(path);
  } catch (error) {
    logError('isPdfDownloaded', error, { fileName });
    return false;
  }
};

export const downloadPdf = async (url: string, fileName: string) => {
  try {
    const path = getPdfPath(fileName);
    console.log('⬇️ Download started', { url, path });
    const result = await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
    console.log('✅ Download completed', result);
    return result;
  } catch (error) {
    logError('downloadPdf', error, { url, fileName });
    throw error;
  }
};
