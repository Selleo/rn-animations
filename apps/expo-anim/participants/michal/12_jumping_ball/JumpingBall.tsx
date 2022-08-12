import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const JumpingBall = (): JSX.Element => {
  const counter = useRef(0);
  const [counterValue, setCounterValue] = useState(counter.current);
  const offsetY = useSharedValue(0);

  const animatedViewStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          offsetY.value === 0
            ? withSpring(offsetY.value)
            : withTiming(offsetY.value, { duration: 500 }),
      },
    ],
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!!counter.current) {
        counter.current = 0;
      } else {
        counter.current = 1;
      }

      setCounterValue(counter.current);
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!!counterValue) {
      offsetY.value = -250;
    } else {
      offsetY.value = 0;
    }
  }, [counterValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedViewStyle, styles.ball]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    backgroundColor: "black",
    borderRadius: 25,
    minHeight: 50,
    minWidth: 50,
  },
});

export default JumpingBall;
