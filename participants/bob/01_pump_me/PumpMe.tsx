import React, { useRef, useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { Pressable, View, Text, Dimensions } from "react-native";
import styles from "./styles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PUMP_DEFER = 1000;
const initialHeight = 50;
const initialWidth = 100;
const maxWidth = Dimensions.get("screen").width * 0.9;

const PumpMe = () => {
  const nextPumpTimout = useRef<any>();
  const isPumping = useRef(false);
  const animatedHight = useSharedValue(initialHeight);
  const animatedWidth = useSharedValue(initialWidth);
  const [danger, setDanger] = useState(false);

  const increaseSize = () => {
    if (isPumping.current) {
      if (animatedWidth.value < maxWidth) {
        animatedHight.value = withTiming(animatedHight.value + 60, {
          duration: 500,
          easing: Easing.bounce,
        });
        animatedWidth.value = withTiming(animatedWidth.value + 60, {
          duration: 500,
          easing: Easing.bounce,
        });
      } else {
        setDanger(true);
      }
      setTimeout(increaseSize, PUMP_DEFER);
    }
  };

  const pumpStart = () => {
    isPumping.current = true;
    nextPumpTimout.current = setTimeout(increaseSize, PUMP_DEFER);
  };
  const stopPumping = () => {
    isPumping.current = false;
    setDanger(false);
    animatedHight.value = withTiming(initialHeight, { duration: 1000 });
    animatedWidth.value = withTiming(initialWidth, { duration: 1000 });
  };

  useEffect(() => {
    return () => {
      if (nextPumpTimout.current) {
        clearTimeout(nextPumpTimout.current);
      }
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: animatedHight.value,
      width: animatedWidth.value,
    };
  });

  return (
    <View style={styles.main}>
      <AnimatedPressable
        style={[
          styles.pressable,
          animatedStyles,
          danger && { backgroundColor: "red" },
        ]}
        onPressIn={pumpStart}
        onPressOut={stopPumping}
      >
        <Text style={styles.textOnBaloon}>
          {danger ? "Stop it! I'll explode in a moment" : "Blow up"}
        </Text>
      </AnimatedPressable>
    </View>
  );
};

export default PumpMe;
