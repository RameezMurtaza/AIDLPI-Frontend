import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import { downloadPdf, getPdfPath } from '../services/fileService';
import { logError } from '../utils/logger';

export default function PdfViewerScreen({ route }: any) {
  const { pdf, isDownloaded } = route.params;
  const [downloading, setDownloading] = useState(false);

  // Determine PDF source
 const source = isDownloaded
  ? { uri: `file://${getPdfPath(pdf.fileName)}` }
  : {
      uri: pdf.fileUrl,
      cache: true,
      trustAllCerts: true, // ⭐ IMPORTANT
    };


  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadPdf(pdf.fileUrl, pdf.fileName);
      Alert.alert('Success', 'PDF downloaded for offline use.');
    } catch (error) {
      logError('handleDownload', error, {
        fileName: pdf.fileName,
        url: pdf.fileUrl,
      });
      Alert.alert('Error', 'Download failed. Check console logs.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        trustAllCerts={false}
        source={source}
        style={{ flex: 1 }}
        onError={error =>
          logError('PdfRender', error, { fileName: pdf.fileName, source })
        }
        onLoadComplete={pages =>
          console.log('📄 PDF loaded', { fileName: pdf.fileName, pages })
        }
      />

      {!isDownloaded && (
        <TouchableOpacity
          onPress={handleDownload}
          style={{ padding: 12, backgroundColor: '#000' }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>
            {downloading ? 'Downloading...' : 'Download'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


