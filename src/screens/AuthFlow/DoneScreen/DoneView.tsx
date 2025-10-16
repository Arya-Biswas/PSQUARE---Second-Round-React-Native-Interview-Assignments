import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthHeader, Text } from '../../../components';
import { fonts, screenHeight } from '../../../helpers/constants/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthLayout from '../../../app/context/AuthLayout';
import { replace } from '../../../navigation';
import ConfettiCannon from 'react-native-confetti-cannon';

export const DoneView = () => {
  const confettiRef = useRef<any>(null);

  useEffect(() => {

    const confettiTimer = setTimeout(() => {
      confettiRef.current?.start();
    }, 200);


    const navigateTimer = setTimeout(() => {
      replace('AuthFlow', { screen: 'Login' });
    }, 5000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(navigateTimer);
    };
  }, []);

  return (
    <AuthLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <AuthHeader />
        <View style={styles.container}>
          <Text fontSize={20} fontFamily={fonts.MEDIUM}>
            Success!
          </Text>
          <Text
            customStyle={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}
            color="#000000A6"
          >
            Congratulations! You’ve successfully created your account.
          </Text>
        </View>

        <ConfettiCannon
          ref={confettiRef}
          count={100}
          origin={{ x: -10, y: screenHeight }} 
          fadeOut={true}
          autoStart={false}
        />
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight / 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
