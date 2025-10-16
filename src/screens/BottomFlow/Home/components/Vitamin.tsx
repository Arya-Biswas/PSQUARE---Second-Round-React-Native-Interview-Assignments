import { StyleSheet, View, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Text, Touchable } from '../../../../components';
import { colors, fonts } from '../../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';
import FastImage from '@d11/react-native-fast-image';
import { ICON_NAMES } from '../../../../helpers/constants/icons';

const Vitamin = () => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
  fontSize={20}
  fontFamily={fonts.BOLD}
  customStyle={{ transform: [{ rotate: '-90deg' }] }}
>
  UPTO
</Text>
<View>
<Text fontSize={40} fontFamily={fonts.BOLD} customStyle={{}}>
           80%
            </Text>
            <Text
  fontSize={20}
  fontFamily={fonts.BOLD}
  customStyle={{ top:-4}}
>
  offer
</Text>

 
</View>
 
            
          </View>
          <Text
  fontSize={20}
  fontFamily={fonts.BOLD}
  customStyle={{ marginLeft:moderateScale(24)}}
>
    On Health Products

</Text>
          <Touchable onPress={() => {}} style={styles.button}>
                <Text fontFamily={fonts.BOLD} fontSize={20} color={colors.white}>
                SHOP NOW
                </Text>
              </Touchable>
        </View>
        <FastImage
          source={ICON_NAMES.vitamin}
          resizeMode="contain"
          style={styles.Vitamin}
        />
      </View>
    </Animated.View>
  );
};

export default Vitamin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightViolet,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    paddingLeft:moderateScale(4),
    alignSelf:"center",
    position: 'absolute',
    top: moderateScale(605),
    width: '90%',
    elevation: 8,
    paddingVertical: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flex: 1,
    paddingRight: moderateScale(10),
    marginBottom:"auto"
  },
  Vitamin: {
    height: moderateScale(111),
    width: moderateScale(107),
  },
 
  button: {

    paddingVertical: moderateScale(8),
    backgroundColor: colors.deepBlue,
    borderRadius: moderateScale(10),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
    marginRight: moderateScale(10),
    alignItems:"center",
    marginHorizontal:moderateScale(18),
    maxWidth:"73%",
    marginTop:moderateScale(10),
    marginBottom:moderateScale(7)
  },
});
