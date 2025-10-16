import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Animated } from 'react-native';
import { colors, fonts } from '../helpers/constants/styles';
import { HomeHeaderData } from '../utils/data';
import FastImage from '@d11/react-native-fast-image';
import Text from './Text';
import { moderateScale } from 'react-native-size-matters';

const HomeHeaderGrid = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;  
  const scaleAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,       
          duration: 200,    
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,    
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),  
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,      
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,       
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      style={[
        styles.card,
        index % 2 === 0 ? { marginRight: moderateScale(8) } : {},
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          elevation: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
          shadowOpacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.2] }),
        },
      ]}
    >
      <Text color={colors.textGrey} fontSize={18} fontFamily={fonts.MEDIUM}>
        {item.title}
      </Text>
      <FastImage source={item.icon} style={styles.icon} resizeMode="contain" />
    </Animated.View>
  );

  return (
    <FlatList
      data={HomeHeaderData}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'flex-start' }}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeHeaderGrid;

const styles = StyleSheet.create({
  container: {},
  card: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(9),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(9),
    paddingLeft: moderateScale(17),
    borderWidth: 1,
    borderColor: colors.textGrey,
    marginHorizontal: moderateScale(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    width: moderateScale(33),
    height: moderateScale(33),
  },
});
