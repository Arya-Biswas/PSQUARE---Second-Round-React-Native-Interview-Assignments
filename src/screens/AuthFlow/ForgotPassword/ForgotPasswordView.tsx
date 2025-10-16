import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthHeader, Button, Input} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {navigate} from '../../../navigation';
import {colors, screenWidth} from '../../../helpers/constants/styles';
type ForgotPasswordViewPropType = {
  email?: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const ForgotPasswordView = ({
  email,
  setEmail,
}: ForgotPasswordViewPropType) => {
  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <AuthHeader title="Forgot Password" subTitle="Enter your email" />
          <View style={styles.inputBox}>
            <Input
              value={email}
              onChange={val => setEmail(val)}
              placeholder="Email"
              style={styles.customEmailStyle}
            />
          </View>

          <View style={styles.inputBox}>
            <Button
              value="Next"
              onPress={() => {
                navigate('OtpVerification', {
                  data: {email: email},
                  provider: 'email',
                  method: 'forgotPassword',
                });
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
  },
  inputBox: {paddingVertical: 30, paddingHorizontal: 0},
  LoginText: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    alignItems: 'center',
    marginTop: 10,
  },
  singleLine: {
    backgroundColor: '#434BDC',
    height: 1,
  },
  singleLineOr: {
    height: 1,
    backgroundColor: '#ECECEC',
    width: screenWidth / 2.7,
  },
  customEmailStyle: {
    backgroundColor: 'white',
  },
  forgotInline: {
    height: 1,
    backgroundColor: '#02031A26',
  },
});
