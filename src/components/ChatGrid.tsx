import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors, fonts } from '../helpers/constants/styles';
import { ChatHeaderData } from '../utils/data';
import FastImage from '@d11/react-native-fast-image';
import Text from './Text';
import { moderateScale } from 'react-native-size-matters';
import { ICON_NAMES } from '../helpers/constants/icons';

const ChatGrid = () => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: moderateScale(130),  
        animated: true,            
      });
    }, 700);  

    return () => clearTimeout(timeout);
  }, []);

  const renderItem = ({ item, index }: any) => (
    <View
      style={[
        styles.card,
        index != ChatHeaderData?.length - 1
          ? { marginRight: moderateScale(20) }
          : { marginRight: moderateScale(23) },
      ]}
    >
      <FastImage source={item.icon} style={styles.icon} resizeMode="cover" />
      <View style={{ paddingHorizontal: moderateScale(9), maxWidth: '80%' }}>
        <Text
          color={colors.black}
          fontSize={16}
          customStyle={{ marginVertical: moderateScale(3), marginTop: moderateScale(9) }}
          fontFamily={fonts.MEDIUM}
        >
          {item.title}
        </Text>
        <Text
          color={colors.lightGrey2}
          fontSize={13}
          customStyle={{ marginTop: moderateScale(0) }}
          fontFamily={fonts.MEDIUM}
        >
          {item.distance}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            marginTop: moderateScale(2),
            marginBottom: moderateScale(7),
          }}
        >
          <FastImage resizeMode="contain" source={ICON_NAMES.star} style={styles.star} />
          <Text color={colors.lightGrey2} fontSize={12} fontFamily={fonts.MEDIUM}>
            {item?.rating} ({item?.reviews} review)
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={ChatHeaderData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ChatGrid;

const styles = StyleSheet.create({
  container: {},
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    alignItems: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#000000',
  },
  icon: {
    width: moderateScale(190),
    height: moderateScale(103),
  },
  star: {
    height: moderateScale(10),
    width: moderateScale(10),
  },
});
