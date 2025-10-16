import React from 'react';
import {StatusBar, TextInput, StyleSheet,} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {store} from './store';
import {Provider} from 'react-redux';
import {Text} from '../../components';
import {colors} from '../../helpers/constants/styles';
import { AppNavigation } from '../../navigation';



interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as any as TextWithDefaultProps).defaultProps = {
  ...((Text as any as TextWithDefaultProps).defaultProps || {}),
  allowFontScaling: false,
};

(TextInput as any as TextInputWithDefaultProps).defaultProps = {
  ...((TextInput as any as TextInputWithDefaultProps).defaultProps || {}),
  allowFontScaling: false,
};

const AppWrapper = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SafeAreaView edges={['top']} style={styles().appWrapper}>
          <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
          <AppNavigation />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = () =>
  StyleSheet.create({
    appWrapper: {
      flex: 1,
      backgroundColor: colors.white,
    },
  });

export default AppWrapper;
