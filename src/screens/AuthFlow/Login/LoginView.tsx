import React, { useEffect, useState, useRef } from 'react';
import { Keyboard, StyleSheet, View, Animated, Easing } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthHeader, Button, Input, ShowToast, Text, Touchable } from '../../../components';
import { navigate, replace } from '../../../navigation';
import AuthLayout from '../../../app/context/AuthLayout';
import { ICON_NAMES } from '../../../helpers/constants/icons';
import { IsValidEmail, isValidPassword } from '../../../utils/validations';
import { colors, fonts } from '../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';

export const LoginView = () => {
  const [email, setEmail] = useState(__DEV__ ? 'aryalong5@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Arya@2001' : '');
  const [submitted, setSubmitted] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateForm = () => {
    setSubmitted(true);
    const errors: any = {};
    if (!email.trim()) errors.email = 'Please enter Email';
    else if (!IsValidEmail(email)) errors.email = 'Invalid Email Address';

    if (!password.trim()) errors.password = 'Please enter Password';
    else if (!isValidPassword(password))
      errors.password =
        'Password must have min 8 chars, uppercase, lowercase, number & symbol';
    return errors;
  };

  const handleSignIn = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return;
    ShowToast('Login successful');
    replace('BottomFlow', { screen: 'HomeScreen' });
  };

  return (
    <AuthLayout>

      <Animated.View style={{ flex: 1, transform: [{ translateY: slideAnim }] }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            <AuthHeader title="LOGIN" subTitle="Healthcare" />

            <View style={{ paddingVertical: 10 }}>
              <Input
                value={email}
                label="Email id"
                onChange={setEmail}
                keyboardType="email-address"
                customIconRight={ICON_NAMES.AuthLogologo}
                asterisk
                maxLength={50}
                showLeftIcon
                autoCapitalize="none"
                customIconLeft={ICON_NAMES.email}
                error={
                  submitted && !email
                    ? 'Please enter Email'
                    : submitted && !IsValidEmail(email)
                    ? 'Invalid Email Address'
                    : undefined
                }
                highlighted={submitted && (!email || !IsValidEmail(email))}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <Input
                value={password}
                onChange={setPassword}
                label="Password"
                isPasswordInput
                gapInBetween
                asterisk
                showLeftIcon
                customIconLeft={ICON_NAMES.lock}
                maxLength={30}
                error={
                  submitted && !password
                    ? 'Please enter Password'
                    : submitted && !isValidPassword(password)
                    ? 'Password must have min 8 chars, uppercase, lowercase, number & symbol'
                    : undefined
                }
                highlighted={submitted && (!password || !isValidPassword(password))}
              />
            </View>

            <View style={{ alignSelf: 'flex-end', marginTop: moderateScale(6) }}>
              <Text fontSize={15} color={colors.primaryText} fontFamily={fonts.MEDIUM}>
                Forgot Password !
              </Text>
            </View>

            <View style={{ marginTop: 30, alignItems: 'center' }}>
              <Touchable onPress={() => navigate('AuthFlow', { screen: 'SignUp' })}>
                <Text fontSize={15}>
                  <Text fontSize={15} fontFamily={fonts.MEDIUM}>Don’t Have an Account: </Text>
                  <Text customStyle={styles.underLine} fontSize={15} fontFamily={fonts.MEDIUM}>
                    Click here to register
                  </Text>
                </Text>
              </Touchable>
            </View>
          </View>
        </KeyboardAwareScrollView>


        <View style={[styles.buttonContainer, { marginBottom: keyboardOpen ? moderateScale(10) : moderateScale(80) }]}>
          <Button value="LOGIN" onPress={handleSignIn} />
        </View>
      </Animated.View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: colors.white },
  underLine: { color: colors.primaryText, textDecorationLine: 'underline' },
  buttonContainer: { paddingHorizontal: 15 },
});
