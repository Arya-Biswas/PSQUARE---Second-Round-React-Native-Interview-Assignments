import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { ICON_NAMES } from '../../../helpers/constants/icons';
import { colors, fonts } from '../../../helpers/constants/styles';
import { Button, Header, Input, ShowToast, Text, Touchable } from '../../../components';
import ChatGrid from '../../../components/ChatGrid';
import { launchImageLibrary } from 'react-native-image-picker';
import { addKeyToStorage, getKeyFromStorage } from '../../../utils/AsyncStorage';
import { STORAGE_KEYS } from '../../../utils/storage';
import FastImage from '@d11/react-native-fast-image';

interface PrescriptionData {
  file: string;
  link: string;
  date: string;
}

const ChatView = () => {
  const [link, setLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const handleUploadLink = () => setShowLinkInput(true);


  const handleUploadFile = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        selectionLimit: 1,
      });

      if (result.didCancel) return;

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (!uri) {
          ShowToast('Unable to get file path.');
          return;
        }
        setFileUri(uri);
        ShowToast('File selected!');
      }
    } catch (error) {
      ShowToast('Something went wrong while selecting the file.');
    }
  };


  const saveBoth = async () => {
    if (!fileUri || !link.trim()) {
      ShowToast('Please select a file and enter a valid link before saving.');
      return;
    }

 

    const newPrescription: PrescriptionData = {
      file: fileUri,
      link: link.trim(),
      date: new Date().toLocaleString(),
    };


    const stored = await getKeyFromStorage(STORAGE_KEYS.prescription_data);
    const prescriptions: PrescriptionData[] = stored ? (stored) : [];

    prescriptions.push(newPrescription);

    await addKeyToStorage(STORAGE_KEYS.prescription_data, JSON.stringify(prescriptions));
    ShowToast('File and link saved successfully!');
    setFileUri(null);
    setLink('');
    setShowLinkInput(false);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex1}
    >
      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <View style={{ paddingHorizontal: moderateScale(24) }}>
            <Header leftIcon={ICON_NAMES.location} />
          </View>

          <View style={{ paddingHorizontal: moderateScale(24) }}>
            <Text
              customStyle={{ marginTop: moderateScale(30), marginBottom: moderateScale(24) }}
              fontFamily={fonts.SEMI_BOLD}
              fontSize={23}
            >
              Pharmacy Nearby
            </Text>
          </View>

          <View style={{ paddingLeft: moderateScale(24) }}>
            <ChatGrid />
          </View>

          <View style={{ paddingHorizontal: moderateScale(24) }}>
            <Text
              fontSize={32}
              fontFamily={fonts.MEDIUM}
              customStyle={{ textAlign: 'center', marginTop: moderateScale(34) }}
            >
              Upload Prescription
            </Text>
            <Text
              fontSize={18}
              fontFamily={fonts.REGULAR}
              customStyle={{ textAlign: 'center', marginTop: moderateScale(12) }}
            >
              {`We will show the pharmacy that fits as per \nyour prescription.`}
            </Text>
          </View>


          <View style={{ paddingHorizontal: moderateScale(24), marginVertical: moderateScale(19) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: moderateScale(0.5),
                borderColor: colors.black,
                paddingVertical: moderateScale(35),
                borderRadius: moderateScale(20),
                paddingHorizontal: moderateScale(30),
              }}
            >
              <Touchable onPress={handleUploadLink}>
                <View style={{ alignItems: 'center' }}>
                  <FastImage resizeMode="contain" source={ICON_NAMES.upload} style={styles.link} />
                  <Text fontSize={20} fontFamily={fonts.MEDIUM} customStyle={{ marginTop: moderateScale(13) }}>
                    Upload Link
                  </Text>
                </View>
              </Touchable>

              <Touchable onPress={handleUploadFile}>
                <View style={{ alignItems: 'center' }}>
                  <FastImage resizeMode="contain" source={ICON_NAMES.attachment} style={styles.link} />
                  <Text fontSize={20} fontFamily={fonts.MEDIUM} customStyle={{ marginTop: moderateScale(13) }}>
                    Upload File
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>


          {showLinkInput && (
            <View style={{ marginHorizontal: moderateScale(24), marginBottom: moderateScale(20) }}>
              <Input label="Enter prescription link" value={link} onChange={setLink} />
              <Button
                value="Continue"
                onPress={saveBoth}
                customStyle={{ backgroundColor: colors.deepGreen, marginTop: moderateScale(12) }}
              />
            </View>
          )}

<View style={{ height: keyboardOpen ? 0 : moderateScale(100) }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChatView;

const styles = StyleSheet.create({
  flex1: { flex: 1, backgroundColor: colors.white },
  scrollContent: { flexGrow: 1 },
  innerContainer: {},
  link: { height: moderateScale(74), width: moderateScale(74) },
});
