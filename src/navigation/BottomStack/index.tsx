
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Screens from '../../screens';
import {colors} from '../../helpers/constants/styles';
import { BottomBar } from '../../components';

interface BottomStackProps {
  initialRoute?: string;
}

const BottomStackNav = createNativeStackNavigator();

export const BottomStack = ({initialRoute = 'HomeScreen'}: BottomStackProps) => {
  return (
    <>
    <BottomStackNav.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: styles.container,
      }}>
      <BottomStackNav.Screen component={Screens.HomeScreen} name="HomeScreen" />
      <BottomStackNav.Screen component={Screens.ChatScreen} name="ChatScreen" />
      <BottomStackNav.Screen component={Screens.ReminderScreen} name="ReminderScreen" />


    </BottomStackNav.Navigator>
      <BottomBar/>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
});
