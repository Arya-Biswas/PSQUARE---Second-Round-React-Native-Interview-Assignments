import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import { Text, Header, Touchable } from '../../../components';
import { colors } from '../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';
import FastImage from '@d11/react-native-fast-image';
import { getKeyFromStorage } from '../../../utils/AsyncStorage';
import { STORAGE_KEYS } from '../../../utils/storage';
import { ICON_NAMES } from '../../../helpers/constants/icons';

interface PrescriptionData {
  file: string;
  link: string;
  date: string;
}

const { width, height } = Dimensions.get('window');

const ReminderView = () => {
  const [data, setData] = useState<PrescriptionData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const stored = await getKeyFromStorage(STORAGE_KEYS.prescription_data);
      setData(stored.reverse());
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openImage = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const isValidUrl = (url: string) => {
    const pattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return pattern.test(url);
  };

  const renderItem = ({ item }: { item: PrescriptionData }) => (
    <View style={styles.card}>
      {item.file && (
        <Touchable onPress={() => openImage(item.file)}>
          <FastImage
            source={{ uri: item.file }}
            style={styles.image}
            resizeMode="cover"
          />
        </Touchable>
      )}
      {item.link && isValidUrl(item.link) && (
        <Touchable onPress={() => Linking.openURL(item.link)}>
          <Text customStyle={styles.link} color={colors.white}>
            Open Prescription Link
          </Text>
        </Touchable>
      )}
      <View style={styles.dateContainer}>
        <Text customStyle={styles.dateLabel}>Created on:</Text>
        <Text customStyle={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="My Prescriptions" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
         <FastImage source={ICON_NAMES.noData} resizeMode='contain' style={styles.nodata}/>
        }
      />
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Touchable
            style={styles.modalCloseArea}
            onPress={() => setModalVisible(false)}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: moderateScale(15) },
  listContent: { marginTop: moderateScale(20), paddingBottom: 100 },
  nodata:{
  height:moderateScale(100),
  width:"70%",
  alignSelf:"center"
  },
  card: {
    marginBottom: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: '100%', height: moderateScale(180), borderRadius: moderateScale(12) },
  link: {
    textDecorationLine: 'underline',
    fontSize: moderateScale(14),
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(12),
    backgroundColor: colors.deepBlue,
    borderRadius: moderateScale(50),
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(3),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'flex-start',
  },
  dateLabel: {
    fontSize: moderateScale(12),
    color: colors.black,
    fontWeight: '500',
    marginRight: moderateScale(4),
  },
  date: {
    fontSize: moderateScale(12),
    color: colors.deepBlue,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: colors.lightBlack,
    marginTop: moderateScale(50),
    fontSize: moderateScale(14),
    alignSelf:"center"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width - 40,
    height: height - 120,
    borderRadius: 12,
  },
  modalCloseArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default ReminderView;
