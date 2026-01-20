import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import { getPdfPath } from '../services/fileService';

export default function PdfViewerScreen({ route }: any) {
  const { pdf, isDownloaded } = route.params;

  const source = isDownloaded
    ? { uri: `file://${getPdfPath(pdf.id, pdf.fileName)}` }
    : {
        uri: pdf.fileUrl,
        headers: {
          'x-admin-key': 'z9srWb95rY5YeiJy9GuchsD9VI3C4D',
        },
        cache: true,
      };

  return (
    <View style={{ flex: 1 }}>
      <Pdf source={source} style={{ flex: 1 }} trustAllCerts={false} />
    </View>
  );
}
