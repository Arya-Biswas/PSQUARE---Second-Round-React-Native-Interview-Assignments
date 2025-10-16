import { StyleSheet, View, ImageSourcePropType } from 'react-native';
import React from 'react';
import Text from './Text';
import { moderateScale } from 'react-native-size-matters';
import FastImage from '@d11/react-native-fast-image';
import { ICON_NAMES } from '../helpers/constants/icons';
import { fonts } from '../helpers/constants/styles';

interface HeaderProps {
  leftIcon?: ImageSourcePropType| undefined;
  title?:string
}

const Header: React.FC<HeaderProps> = ({ leftIcon,title }) => {
  return (
    <View style={styles.container}>
      <FastImage source={ICON_NAMES.back} resizeMode="contain" style={styles.backIcon} />
      {leftIcon ? <FastImage source={leftIcon} resizeMode="contain" style={styles.leftIcon} />:null}
      <Text fontSize={20}fontFamily={fonts.MEDIUM}>
       {title||"Mohali"} 
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:moderateScale(15),
    paddingTop:moderateScale(10)
  },
  backIcon: {
    height: moderateScale(40),
    width: moderateScale(42),

  },
  leftIcon: {
    height: moderateScale(24),
    width: moderateScale(31),
  },
});
