import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import {colors, fonts} from '../helpers/constants/styles';

type AuthHeaderProps = {
  title?: string;
  subTitle?: string;
};

export const AuthHeader = ({title, subTitle}: AuthHeaderProps) => {
  if (!title && !subTitle) return null;

  return (
    <View style={styles.container}>
      {title ? (
        <Text
          customStyle={styles.title}
          color={colors.black}
          fontFamily={fonts.MEDIUM}
          fontSize={24}>
          {title}
        </Text>
      ) : null}

      {subTitle ? (
        <Text
          customStyle={styles.subTitle}
          color={colors.black}
          fontFamily={fonts.MEDIUM}
          fontSize={50}>
          {subTitle}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    marginTop: 45,  
    textAlign: 'center',
  },
  subTitle: {
    marginVertical: 90,  
    textAlign: 'center',
  },
});
