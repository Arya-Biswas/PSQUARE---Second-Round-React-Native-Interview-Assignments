import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {colors} from '../helpers/constants/styles';
import React from 'react';

/**
 *
 * @prop {type} example - example description
 */
const Error = ({error}: {error: string}) => {
  return (
    <View style={styles.container}>
      <Text children={error} color="#FF4D4F" fontSize={11} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Error;
