
import React, {useState} from 'react';
import {
  I18nManager,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import FastImage from '@d11/react-native-fast-image';

import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../helpers/constants/styles';
import {ICON_NAMES} from '../helpers/constants/icons';
import Error from './Error';

interface InputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  isPasswordInput?: boolean;
  isRounded?: boolean;
  error?: string;
  customContainerStyle?: object;
  customInputStyle?: object;
  customIconLeft?: any;
  customIconRight?: any;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftTintColor?: string;
  inputRef?: any;
  autoFocus?: boolean;
  highlighted?: boolean;
  returnKeyType?: any;
  keyboardType?: any;
  asterisk?: boolean;
  onChange?: (text: string) => void;
  onEndEditing?: (e: any) => void;
  onRightIcon?: () => void;
  rightText?: string;
  onRightText?: () => void;
  gapInBetween?: boolean;
}

const Input: React.FC<InputProps> = ({
  value = '',
  placeholder = '',
  label = '',
  isPasswordInput = false,
  isRounded = false,
  error = '',
  customContainerStyle = {},
  customInputStyle = {},
  customIconLeft = null,
  customIconRight = null,
  showLeftIcon = false,
  showRightIcon = false,
  leftTintColor = '',
  inputRef = null,
  autoFocus = false,
  highlighted = false,
  returnKeyType = 'done',
  keyboardType = 'default',
  asterisk = false,
  onChange = () => {},
  onEndEditing = () => {},
  onRightIcon = () => {},
  rightText = '',
  onRightText = () => {},
  gapInBetween = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onIconPress = () => {
    if (isPasswordInput) setShowPassword(prev => !prev);
  };

  const styles = getStyles(isRounded, colors);

  const showPasswordIcon = () => (
    <Touchable onPress={onIconPress}>
      <FastImage
        source={showPassword ? ICON_NAMES.eye : ICON_NAMES.hide}
        resizeMode="contain"
        style={styles.rightIcon}
      />
    </Touchable>
  );

  const shouldFloatLabel = true;

  return (
    <View style={{marginTop: gapInBetween ? 40 : 0}}>
      <View
        style={[
          styles.container,
          customContainerStyle,
          {
            borderColor: error
              ? '#FF4D4F'
              : highlighted
              ? '#FF4D4F'
              : isFocused
              ? '#000'
              : '#000',
          },
        ]}>
        {/* Floating label */}
        {label && (
          <Text
            fontSize={12}
            color={error ? colors.red : colors.black}
            customStyle={[
              styles.floatingLabel,
              {top: shouldFloatLabel ? -10 : 20},
            ]}>
            {label}
            {asterisk && '*'}
          </Text>
        )}

        <View style={styles.inputWrapper}>
          {showLeftIcon && customIconLeft && (
            <FastImage
              source={customIconLeft}
              resizeMode="contain"
              style={[
                styles.leftIcon,
                {tintColor: leftTintColor || colors.black},
              ]}
            />
          )}

          <TextInput
            {...props}
            value={value}
            onChangeText={onChange}
            onEndEditing={onEndEditing}
            ref={inputRef}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={isPasswordInput && !showPassword}
            style={[styles.input, customInputStyle]}
            placeholder={shouldFloatLabel ? '' : placeholder}
            placeholderTextColor={colors.black}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {isPasswordInput && showPasswordIcon()}

          {showRightIcon && customIconRight && (
            <Touchable onPress={onRightIcon}>
              <FastImage
                source={customIconRight}
                resizeMode="contain"
                style={styles.rightIcon}
              />
            </Touchable>
          )}

          {rightText ? (
            <Touchable onPress={onRightText}>
              <Text fontFamily={fonts.BOLD} fontSize={10}>
                {rightText}
              </Text>
            </Touchable>
          ) : null}
        </View>
      </View>

      {error ? <Error error={error} /> : null}
    </View>
  );
};

const getStyles = (isRounded: boolean, colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.bg,
      borderWidth: 0.5,
      borderRadius: isRounded ? 25 : 10,
      paddingHorizontal: 10,
    },
    floatingLabel: {
      position: 'absolute',
      left: 12,
      paddingHorizontal: 10,
      backgroundColor: colors.bg,

    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',  
      height: 60
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontFamily: fonts.MEDIUM,
      color: colors.black,
      paddingVertical: 0,  
      paddingHorizontal: 0,
      textAlignVertical: 'center', 
      marginLeft:10
    },
    leftIcon: {
      width: 20,
      height: 20,
      marginRight:8,
      alignSelf: 'center',
      marginLeft:4,
      marginBottom:2
    },
    rightIcon: {
      width: 20,
      height: 20,
      marginLeft: 8,
      marginRight:4,
      alignSelf: 'center',
    },
  });


export default Input;
