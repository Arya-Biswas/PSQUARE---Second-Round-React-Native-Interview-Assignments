import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, fonts } from '../../../helpers/constants/styles';
import { moderateScale } from 'react-native-size-matters';
import { Text } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { replace } from '../../../navigation';

const SplashView = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const outerWaveScale = useRef(new Animated.Value(1)).current;
  const waveFadeAnim = useRef(new Animated.Value(1)).current;
  const circleFadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([

      Animated.timing(scaleAnim, {
        toValue: 3,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.timing(outerWaveScale, {
        toValue: 4,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.timing(circleFadeAnim, {
        toValue: 0,
        duration: 1400,
        useNativeDriver: true,
      }),

      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(waveFadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => replace('Login',undefined));
  }, []);

  return (
    <View style={styles.container}>
      {/* Outer faded wave */}
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [{ scale: outerWaveScale }],
            backgroundColor: 'rgba(83, 145, 180, 0.3)', // faded primary
          },
        ]}
      />
      {/* Main wave */}
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [{ scale: scaleAnim }],
            opacity: waveFadeAnim,
            backgroundColor: '#5391B4', // primary
          },
        ]}
      />

      {/* Center circle */}
      <Animated.View style={[styles.circle, { opacity: circleFadeAnim }]}>
        <Text fontSize={44} fontFamily={fonts.MEDIUM} color="#fff">
          Healthcare
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#5391B4',
    width: moderateScale(350),
    height: moderateScale(400),
    borderRadius: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  wave: {
    position: 'absolute',
    width: moderateScale(430),
    height: moderateScale(430),
    borderRadius: moderateScale(255),
  },
});
