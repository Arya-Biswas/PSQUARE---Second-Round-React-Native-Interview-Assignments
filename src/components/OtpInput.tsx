import React, { Dispatch, SetStateAction } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { isNumber } from '../utils/validations';
import { colors } from '../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';

const OtpInput = ({
  otp,
  setOtp,
  onSubmit,
}: {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  onSubmit?: (code: string) => void;
}) => {
  return (
    <View>
      <OTPInputView
        style={{ width: '100%', height: 70 }}
        pinCount={6}
        code={otp}
        onCodeChanged={code => {
          if (isNumber(code)) setOtp(code);
        }}
        autoFocusOnLoad={Platform.OS === 'ios'}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code entered: ${code}`);
          if (onSubmit) onSubmit(code);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 12,
    fontSize: 24,
    color: colors.black,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#00000066',
  },
  underlineStyleHighLighted: {
    borderColor: '#00000066',
    borderWidth: 1,
  },
});

export default OtpInput;
