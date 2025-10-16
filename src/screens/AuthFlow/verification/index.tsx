import React, {useEffect, useState} from 'react';
import {replace} from '../../../navigation';

import {useVerifyEmailOtpMutation} from '../../../services/auth';
import {ShowToast} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OtpVerificationView } from './VerificationView';

const OtpVerification = (props: any) => {
  const [otp, setOtp] = useState('');
  const [countDown, setCountDown] = useState(59);
  const [loading, setLoading] = useState(false);

  const {data, method} = props?.route?.params || {};
  const [verifyEmailOtp] = useVerifyEmailOtpMutation();

  useEffect(() => {
    if (otp.length === 6) {
      handleOtpSubmit();
    }
  }, [otp]);

  const saveUserData = async (userData: any) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

    } catch (error) {

    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      setLoading(true);
      try {
        const response = await verifyEmailOtp({
          body: {
            email: data?.email,
            action: 'register',
            code: otp,
          },
        }).unwrap();

        ShowToast(response?.message || '');

        if (response) {
          await saveUserData({
            token: response.token,
            refreshToken: response.refreshToken,
            user: response.user,
          });

          replace('DoneScreen', undefined);
        }
      } catch (err: any) {
        setOtp('');
        ShowToast(err?.data?.details[0]?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    setCountDown(59);
    setOtp('');
  };

  return (
    <OtpVerificationView
      otp={otp}
      setOtp={setOtp}
      countDown={countDown}
      loading={loading}
      data={data}
      method={method}
      otpVerificationHandleSubmit={handleOtpSubmit}
      resendOtpHandle={handleResendOtp}
      provider={data?.provider || 'email'}
      isModalVisible={false}
    />
  );
};

export default OtpVerification;
