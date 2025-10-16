
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, ActivityIndicator, View, Platform } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStack } from './AuthStack';
import { BottomStack } from './BottomStack';
import { colors } from '../helpers/constants/styles';
import { getKeyFromStorage } from '../utils/AsyncStorage';
import { STORAGE_KEYS } from '../utils/storage';

export const navigationRef = createNavigationContainerRef();


const handleBackButtonClick = () => {
  if (!navigationRef.canGoBack()) {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to exit the application?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
    );
    return true;
  }
  return false;
};

// Navigation helpers
export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as never, params as never));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) navigationRef.goBack();
    else handleBackButtonClick();
  }
}

const RootStack = createNativeStackNavigator();

export const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);


  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      return () => backHandler.remove();
    }
  }, []);


  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        const token = await getKeyFromStorage(STORAGE_KEYS.token);

        if (token) {
          setInitialRoute('BottomFlow');  
        } else {
          setInitialRoute('AuthFlow'); 
        }
      } catch (err) {
        setInitialRoute('AuthFlow');
      }
    };

    determineInitialRoute();
  }, []);


  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <RootStack.Screen
          name="AuthFlow"
          children={() => <AuthStack initialRoute="SplashScreen" />}
        />
        <RootStack.Screen name="BottomFlow" component={BottomStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
