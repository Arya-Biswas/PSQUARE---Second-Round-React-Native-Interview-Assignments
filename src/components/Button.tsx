import React from 'react';

import {
  ActivityIndicator,
  GestureResponderEvent,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
// import FastImage, {Source} from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import Touchable from './Touchable';
import Text from './Text';
import {colors, fonts} from '../helpers/constants/styles';

/**
 *
 * @param onPress
 * @param value
 * @param type
 * @param disabled
 * @param customStyle
 * @returns {JSX.Element}
 * @constructor
 */

type ButtonTypes = {
  onPress: (event: GestureResponderEvent) => void;
  value?: string;
  disabled?: boolean;
  customStyle?: any;
  leftIcon?: Source;
  buttonTextColor?: string;
  loading?: boolean;
};

const Button = ({
  onPress,
  value = '',
  disabled = false,
  customStyle = {},
  leftIcon,
  buttonTextColor = '',
  loading = false,
}: ButtonTypes): JSX.Element => {
  const buttonStyle = disabled ? styles.disabled : styles.default;
  const textColor = disabled ? colors.bg : buttonStyle.color;

  return (
    <Touchable
      disabled={disabled}
      style={[styles.container, buttonStyle, customStyle]}
      onPress={e => {
        Keyboard.dismiss();
        onPress(e);
      }}>
      {leftIcon ? (
        <View style={styles.imageWrapper}>
          <FastImage source={leftIcon} style={styles.imageStyle} />
        </View>
      ) : null}
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          children={value}
          color={buttonTextColor || textColor}
          fontFamily={fonts.MEDIUM}
          fontSize={24}
        />
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'center',
  },
  default: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  bordered: {
    backgroundColor: 'transparent',

    borderWidth: 2,
  },
  disabled: {
    color: colors.white,
  },
  imageStyle: {
    width: 22,
    height: 22,
  },
  imageWrapper: {
    marginRight: 5,
  },
});

export default Button;
