import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import styles, { COLOR_DEFAULT, COLOR_WARNING, DIAMETER } from './styles';

const BASE_SCALE = 1
const DURATION = 500

const PumpMyButton = () => {
  const { width } = useWindowDimensions();
  const scale = useSharedValue(BASE_SCALE)
  
  const secretFormula = width / DIAMETER * 0.9

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withTiming(secretFormula, { duration: DURATION })
    },
    onEnd: () => {
      scale.value = withTiming(BASE_SCALE, { duration: DURATION });
    },
  });

  const scaleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: scale.value === secretFormula ? COLOR_WARNING : COLOR_DEFAULT,
    };
  });

  const dangerStyles = useAnimatedStyle(() => {
    return {
      opacity: scale.value === secretFormula ? 1 : 0
    };
  });

  return (
    <View style={styles.container}>
      {/*@ts-ignore*/}
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.baloon, scaleStyles]} />
      </TapGestureHandler>
      <Animated.View style={[dangerStyles]}>
        <Text style={[styles.dangerText]}>Stop it! I'll explode in a moment</Text>
      </Animated.View>
    </View>
  );
}

export default PumpMyButton
