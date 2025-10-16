import React from 'react';
import {View} from 'react-native';
const AuthLayout = ({children}: {children: any}) => {
  return <View style={{flex: 1}}>{children}</View>;
};
export default AuthLayout;
