import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import Screens from '../../screens';
import { colors } from '../../helpers/constants/styles';

interface AuthStackProps {
  initialRoute?: string;
}

const AuthStackNav = createNativeStackNavigator();

export const AuthStack = ({ initialRoute = 'Login' }: AuthStackProps) => {
  return (
    <AuthStackNav.Navigator
      initialRouteName={initialRoute}
      screenOptions={({  }) => ({
        headerShown: false,
        contentStyle: styles.container,

      })}
    >
      <AuthStackNav.Screen name="Login" component={Screens.LoginScreen} />
      <AuthStackNav.Screen name="SignUp" component={Screens.SignUpScreen} />
      <AuthStackNav.Screen name="ForgotScreen" component={Screens.ForgotScreen} />
      <AuthStackNav.Screen name="OtpVerification" component={Screens.OtpVerification} />
      <AuthStackNav.Screen name="DoneScreen" component={Screens.DoneScreen} />
      <AuthStackNav.Screen name="SplashScreen" component={Screens.SplashScreen} />
    </AuthStackNav.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
