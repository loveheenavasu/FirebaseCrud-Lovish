// DocumentPicker.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Attachment from 'react-native-vector-icons/Entypo';
import { handleDocsUpload, sendChatMessage } from '../apiconfig/firebaseapi';

interface DocumentPickerProps {
  chatId: string;
  currentuserId: string;
  name: string;
}

const DocPicker: React.FC<DocumentPickerProps> = ({ chatId, currentuserId, name }) => {
    const sendDocumentMessage = async (documentURL: string) => {
        sendChatMessage(chatId, currentuserId, name, '', '', documentURL, '');
      };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (result && result[0]?.uri) {
        const documentDownloadURL = await handleDocsUpload(result[0].uri);

        if (documentDownloadURL) {
          sendDocumentMessage(documentDownloadURL);
        } else {
          console.error('Failed to upload document to Firebase Storage.');
        }
      } else {
        console.error('No document selected or URI is null.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Cancelled by user');
      } else {
        throw err;
      }
    }
  };

  return (
    <TouchableOpacity onPress={pickDocument}>
      <Attachment name="attachment" size={26} />
    </TouchableOpacity>
  );
};

export default DocPicker;
