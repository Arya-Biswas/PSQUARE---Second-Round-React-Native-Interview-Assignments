import { StyleSheet, View, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text } from '../../../../components';
import { colors, fonts } from '../../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';
import FastImage from '@d11/react-native-fast-image';
import { ICON_NAMES } from '../../../../helpers/constants/icons';

const Doctor = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <View>
            <Text fontSize={20} fontFamily={fonts.BOLD}>
              {`Get the Best \nMedical Service`}
            </Text>
            <Text fontSize={12} fontFamily={fonts.BOLD} customStyle={styles.subtext}>
              Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur. Qui numquam rerum hic repudiandae rerum id amet tempore nam molestias omnis qui earum voluptatem!
            </Text>
          </View>
        </View>
        <FastImage
          source={ICON_NAMES.doctor}
          resizeMode="contain"
          style={styles.doctor}
        />
      </View>
    </Animated.View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGreen,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(23),
    alignSelf:"center",
    position: 'absolute',
    top: moderateScale(410),
    width: '90%',
    elevation: 8,
    paddingTop: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flex: 1,
    paddingRight: moderateScale(10),
    marginBottom:"auto"
  },
  doctor: {
    height: moderateScale(157),
    width: moderateScale(66),
  },
  subtext: {
    marginTop: moderateScale(10)
  }
});
