import React from 'react';
import {StyleSheet, Text as _Text} from 'react-native';
import {colors, fonts} from '../helpers/constants/styles';

// import RNStyles from '@tapston/react-native-styles';
// import Animated from 'react-native-reanimated';

// import {colors} from '../helpers/styles';
/**
 *
 * @param fontSize
 * @param fontFamily
 * @param color
 * @param children
 * @param opacity
 * @param customStyle
 * @param isAnimated
 * @param props
 * @returns {JSX.Element}
 * @private
 */
const Text = ({
  fontSize = 16,
  fontFamily = fonts.REGULAR,
  color = colors.black,
  children = '',
  opacity = 1,
  customStyle = {},
  ...props
}): JSX.Element => {
  const style = styles(fontSize, fontFamily, color, opacity);

  const resultProps = {
    children,
    style: [style.text, customStyle],
    ...props,
  };

  return <_Text {...resultProps} />;
};

const styles = (
  fontSize: number,
  fontFamily: string,
  color: string,
  opacity: number,
) =>
  StyleSheet.create({
    text: {
      fontSize,
      fontFamily,
      color,
      opacity,
      lineHeight: fontSize + 8,
      flexWrap: 'wrap',
    },
  });

export default Text;
