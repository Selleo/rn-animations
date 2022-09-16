import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const BouncingBall: React.FC = () => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const translateYValue = useSharedValue(0);

  const borderRadiusValue = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYValue.value }],
    };
  });

  const animatedBorderRadius = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadiusValue.value,
    };
  });

  function onPress() {
    translateYValue.value = withSequence(
      withTiming(-250, { duration: 1000 }),
      withTiming(250, { duration: 600 }),
      withSpring(0, { damping: 5 })
    );
    borderRadiusValue.value = withSequence(
      withTiming(-250, { duration: 1000 }),
      withTiming(250, { duration: 600 }),
      withSpring(0, { damping: 5 })
    );
  }

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <AnimatedTouchable
        onPress={onPress}
        style={[animatedBorderRadius, styles.ball]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
  },
});

export default BouncingBall;
