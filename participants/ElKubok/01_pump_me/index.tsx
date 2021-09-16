import React, { FC } from "react";
import { Text, TouchableOpacity, Dimensions, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
  withSequence,
  withRepeat,
} from "react-native-reanimated";

import styles from "./styles";

export interface IProps {}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

const GrowingButton: FC<IProps> = ({}) => {
  const touchStatus = useSharedValue(0);
  const rotation = useSharedValue(0);
  const { width } = Dimensions.get("screen");
  const maxWidth = 0.9 * width;
  const almostEndThreshold = 0.9 * maxWidth;
  const duration = 2000;

  const animatedButtonStyles = useAnimatedStyle(() => {
    return {
      height: touchStatus.value,
      width: touchStatus.value,
      backgroundColor: interpolateColor(
        touchStatus.value,
        [almostEndThreshold, maxWidth],
        ["aqua", "orange"]
      ),
    };
  });

  const shakingStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        touchStatus.value,
        [almostEndThreshold, maxWidth],
        [0, 1]
      ),
    };
  });

  const pressInHandler = () => {
    touchStatus.value = withTiming(maxWidth, { duration }, () => {
      rotation.value = withSequence(
        withTiming(-2, { duration: 50 }),
        withRepeat(withTiming(2, { duration: 100 }), -1, true),
        withTiming(0, { duration: 50 })
      );
    });
  };

  const pressOutHandler = () => {
    rotation.value = withRepeat(withTiming(0, { duration: 100 }), 2, true);
    touchStatus.value = withTiming(0, { duration });
  };

  return (
    <View style={styles.container}>
      <AnimatedText style={animatedTextStyles}>
        Stop it! I'll explode in a moment!
      </AnimatedText>
      <AnimatedTouchable
        style={[styles.button, animatedButtonStyles, shakingStyles]}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        activeOpacity={1}
      >
        <Text>Click me</Text>
      </AnimatedTouchable>
    </View>
  );
};

export default GrowingButton;
