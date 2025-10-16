import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthHeader, Button, Input, ShowToast, Text, Touchable } from '../../../components';
import { navigate } from '../../../navigation';
import AuthLayout from '../../../app/context/AuthLayout';
import { colors, fonts } from '../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';
import { IsValidEmail, isValidPassword } from '../../../utils/validations';
import { SignUpErrors } from '../../../utils/errorMessages';
import auth from '@react-native-firebase/auth';

export const SignUpView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const validateForm = () => {
    setSubmitted(true);
    const errors: any = {};

    if (!firstName.trim()) errors.firstName = SignUpErrors.firstNameRequired;
    else if (firstName.length < 2) errors.firstName = SignUpErrors.firstNameShort;

    if (!lastName.trim()) errors.lastName = SignUpErrors.lastNameRequired;
    else if (lastName.length < 2) errors.lastName = SignUpErrors.lastNameShort;

    if (!email.trim()) errors.email = SignUpErrors.emailRequired;
    else if (!IsValidEmail(email)) errors.email = SignUpErrors.emailInvalid;

    if (!password.trim()) errors.password = SignUpErrors.passwordRequired;
    else if (!isValidPassword(password)) errors.password = SignUpErrors.passwordInvalid;

    return errors;
  };

  const handleSignUp = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return;
  
    try {

      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
  

      await userCredential.user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
  

      await userCredential.user.sendEmailVerification();
  

      ShowToast('Signup successful! Please verify your email.');
  

      navigate('OtpVerification', { data: { email } });
  
    } catch (error: any) {

      if (error.code === 'auth/email-already-in-use') {
        ShowToast('Email already in use.');
      } else if (error.code === 'auth/invalid-email') {
        ShowToast('Invalid email format.');
      } else if (error.code === 'auth/weak-password') {
        ShowToast('Password should be at least 6 characters.');
      } else {
        ShowToast('Signup failed. Please try again.');
      }
    }
  };
  
  
  return (
    <AuthLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <AuthHeader title="Get Started" subTitle="Healthcare" />


          <View style={styles.inputBox}>
            <Input
              value={firstName}
              onChange={setFirstName}
              label="First Name"
              asterisk
              maxLength={30}
              error={submitted && (!firstName || firstName.length < 2) ? (!firstName ? SignUpErrors.firstNameRequired : SignUpErrors.firstNameShort) : undefined}
              highlighted={submitted && (!firstName || firstName.length < 2)}
            />
          </View>


          <View style={styles.inputBox}>
            <Input
              value={lastName}
              onChange={setLastName}
              label="Last Name"
              asterisk
              maxLength={30}
              error={submitted && (!lastName || lastName.length < 2) ? (!lastName ? SignUpErrors.lastNameRequired : SignUpErrors.lastNameShort) : undefined}
              highlighted={submitted && (!lastName || lastName.length < 2)}
            />
          </View>


          <View style={styles.inputBox}>
            <Input
              value={email}
              onChange={setEmail}
              label="Email"
              keyboardType="email-address"
              asterisk
              autoCapitalize={"none"}
              maxLength={50}
              error={submitted && (!email || !IsValidEmail(email)) ? (!email ? SignUpErrors.emailRequired : SignUpErrors.emailInvalid) : undefined}
              highlighted={submitted && (!email || !IsValidEmail(email))}
            />
          </View>


          <View style={styles.inputBox}>
            <Input
              value={password}
              onChange={setPassword}
              label="Password"
              isPasswordInput
              asterisk
              maxLength={30}
              error={submitted && (!password || !isValidPassword(password)) ? SignUpErrors.passwordInvalid : undefined}
              highlighted={submitted && (!password || !isValidPassword(password))}
            />
          </View>


          <Touchable
            style={styles.signUpText}
            onPress={() => navigate('AuthFlow', { screen: 'Login' })}
          >
            <Text fontSize={15} fontFamily={fonts.MEDIUM}>
              Already have an account?{' '}
              <Text style={styles.underLine} fontSize={15} fontFamily={fonts.MEDIUM}>
                Login
              </Text>
            </Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>

      <View style={[styles.inputBox, { marginBottom: keyboardOpen ? moderateScale(10) : moderateScale(30), paddingHorizontal: 15 }]}>
        <Button value="Sign Up" onPress={handleSignUp} />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: colors.white },
  inputBox: { paddingVertical: 10 },
  signUpText: { alignItems: 'center', marginTop: 20 },
  underLine: { color: colors.primaryText, textDecorationLine: 'underline' },
});
