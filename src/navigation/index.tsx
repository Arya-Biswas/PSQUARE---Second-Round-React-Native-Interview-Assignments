// navigation/AppNavigation.tsx
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, ActivityIndicator, View} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import {AuthStack} from './AuthStack';
import {colors} from '../helpers/constants/styles';
import { BottomStack } from './BottomStack';

export const navigationRef = createNavigationContainerRef();


const handleBackButtonClick = () => {
  if (!navigationRef.canGoBack()) {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to exit the application?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
    );
    return true;
  }
  return false;
};


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

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const determineInitialRoute = async () => {
      try {   
        setInitialRoute('SplashScreen');  
      } catch (err) {
        setInitialRoute('SplashScreen');
      }
    };

    determineInitialRoute();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="AuthFlow"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.bg},
        }}>
        <RootStack.Screen
          name="AuthFlow"
          children={() => <AuthStack initialRoute={initialRoute} />}
        />
             <RootStack.Screen name="BottomFlow" component={BottomStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
