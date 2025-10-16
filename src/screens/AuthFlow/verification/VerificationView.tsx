import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthHeader, OtpInput, Button, Text, ShowToast } from '../../../components';
import AuthLayout from '../../../app/context/AuthLayout';
import { colors, fonts, } from '../../../helpers/constants/styles';
import { replace, navigate } from '../../../navigation';
import { moderateScale } from 'react-native-size-matters';

type VerificationProps = {
  data?: any;
  method?: string; 
};

export const OtpVerificationView = ({ data, method }: VerificationProps) => {
  const [otp, setOtp] = useState('');
  const [countDown, setCountDown] = useState(30);


  useEffect(() => {
    const timer = countDown > 0 && setInterval(() => setCountDown(prev => prev - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [countDown]);

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      ShowToast('Please enter a valid 6-digit OTP');
      return;
    }

    replace('DoneScreen');
  };

  const handleResendOtp = () => {
    setOtp('');
    setCountDown(30);
    ShowToast('OTP resent successfully');

  };

  return (
    <AuthLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <AuthHeader
          title={
            method === 'signup'
              ? ' '
              : method === 'forgotPassword'
              ? 'Verify OTP'
              : 'Verify OTP'
          }
        
        />

        <View style={{ marginTop: moderateScale(20), alignItems: 'center' }}>
          <Text fontSize={20} fontFamily={fonts.BOLD} customStyle={{ textAlign: 'center' }}>
            Verify your account
          </Text>

          <Text
            fontSize={13}
            color={colors.lightGrey}
            customStyle={{ textAlign: 'center', marginTop: moderateScale(6) }}
          >
            We have sent a verification code to your email {data?.email || 'example@email.com'}. Please check and enter it below.
          </Text>
        </View>

        <View style={styles.container}>
          <OtpInput otp={otp} setOtp={setOtp} />

          <View style={styles.timerContainer}>
            <Text fontSize={12} fontFamily={fonts.REGULAR} color="#00000073">
              00:{countDown < 10 ? `0${countDown}` : countDown}
            </Text>

            <TouchableOpacity onPress={handleResendOtp}>
              <Text fontSize={13} color={colors.primaryText} fontFamily={fonts.MEDIUM}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: moderateScale(30) }}>
            <Button value="Verify OTP" onPress={handleOtpSubmit} />
          </View>

         
        </View>
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    position: 'relative',
  },
  container: {
    marginTop: moderateScale(20),
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    alignItems: 'center',
  },
});
