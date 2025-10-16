import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const colors = {
  bg: '#ffffff',
  black: '#0F1727',
  lightBlack: '#27252E',
  white: '#FFFFFF',
  darkBlack: '#02031A',
  red: '#CC0000',
  darkGrey: '#6A6A6A',
  lightGrey: '#6C7278',
  // new
  green: '#0F9D58',
  grey: '#D3D3D3',
  primary: '#5391B4',
  background: '#F2F5FC',
  subTitle: '#000000A6',
  primaryText:"#04238E",
  buttonGreen:"#41B592",
  bottomBarBackground:"#D9D9D9",
  bottomGrey:"#3C3B3B",
  textGrey:"#6C6060",
  deepBlue:"#1C82DF",
  lightPink:"#F5E1E9",
  lightGreen:"#C8F5C4",
  lightViolet:"#D7D0FF",
  lightGrey2:"#453E3E",
  deepGreen:"#41B592"
};

const fonts = {
  BLACK: 'Baloo2-ExtraBold',
  BOLD: 'Baloo2-Bold',
  SEMI_BOLD: 'Baloo2-SemiBold',
  MEDIUM: 'Baloo2-Medium',
  REGULAR: 'Baloo2-Regular',
 
};

export {screenWidth, screenHeight, colors, fonts};
