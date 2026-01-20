import RNFS from 'react-native-fs';
import { logError } from '../utils/logger';

export const getPdfPath = (id: string, fileName: string) =>
  `${RNFS.DocumentDirectoryPath}/${id}_${fileName}`;

export const isPdfDownloaded = async (id: string, fileName: string) => {
  try {
    return await RNFS.exists(getPdfPath(id, fileName));
  } catch (error) {
    logError('isPdfDownloaded', error);
    return false;
  }
};

export const downloadPdf = async (
  url: string,
  id: string,
  fileName: string,
) => {
  try {
    return await RNFS.downloadFile({
      fromUrl: url,
      toFile: getPdfPath(id, fileName),
      headers: {
        'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
      },
    }).promise;
  } catch (error) {
    logError('downloadPdf', error);
    throw error;
  }
};

export const deletePdf = async (id: string, fileName: string) => {
  try {
    const path = getPdfPath(id, fileName);
    const exists = await RNFS.exists(path);
    if (exists) {
      await RNFS.unlink(path);
    }
  } catch (error) {
    logError('deletePdf', error);
    throw error;
  }
};
