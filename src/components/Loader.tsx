import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Image, Dimensions } from 'react-native';
import { ICON_NAMES } from '../helpers/constants/icons';

const { width, height } = Dimensions.get('window');
const colors = {
  primary: '#F57C00',
  white: '#FFFFFF',
};

const Loader = ({ loading }: { loading: boolean }) => {
  const wave1Y = useRef(new Animated.Value(0)).current;
  const wave2Y = useRef(new Animated.Value(0)).current;

  const animateWave = (wave: Animated.Value, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave, {
          toValue: -8,  
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(wave, {
          toValue: 0, 
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (loading) {
      animateWave(wave1Y, 0);
      animateWave(wave2Y, 250);  
    } else {
      wave1Y.stopAnimation();
      wave2Y.stopAnimation();
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <View
      style={{
        height,
        width,
        position: 'absolute',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 3,
          borderColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <Animated.Image
          source={ICON_NAMES.baseWave1}
          style={{
            width: 40,
            height: 20,
            position: 'absolute',
            transform: [{ translateY: wave1Y }],
          }}
          resizeMode="contain"
        />
        <Animated.Image
          source={ICON_NAMES.baseWave2}
          style={{
            width: 40,
            height: 20,
            position: 'absolute',
            transform: [{ translateY: wave2Y }],
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Loader;
