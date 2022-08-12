import * as React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { times } from "lodash";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Spinner from "./Spinner";

const { height } = Dimensions.get("screen");

export default () => {
  const state = useSharedValue(0);
  // 0 normal, 1 loading, 2 failure, 4 success
  const pulsate = useSharedValue(1);
  const spin = useSharedValue(0);

  React.useEffect(() => {
    pulsate.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 1000 }),
        withTiming(1, { duration: 200 })
      ),
      -1
    );
    spin.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
  });

  // 0 normal, 1 loading, 2 failure, 4 success
  const wrapperStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      state.value,
      [0, 1, 2, 3],
      ["#B2C3D2", "#ADFF2F", "#7f0000", "#00FF00"]
    );
    const shakeStyles =
      state.value === 2
        ? {
            transform: [
              { scale: pulsate.value },
              { rotate: `${(pulsate.value - 1) * 20}deg` },
            ],
          }
        : {};

    const happySpin =
      state.value === 3
        ? {
            transform: [{ rotate: `${spin.value}deg` }],
          }
        : {};

    return {
      backgroundColor,
      width: interpolate(state.value, [0, 1, 2, 3], [60, 30, 60, 60]),
      ...shakeStyles,
      ...happySpin,
    };
  });

  const firstStateStyles = useAnimatedStyle(() => {
    const isVisible = state.value === 0;
    return {
      display: isVisible ? "flex" : "none",
    };
  });

  const secondStateStyle = useAnimatedStyle(() => {
    const isVisible = state.value === 1;
    return {
      display: isVisible ? "flex" : "none",
      transform: [{ rotate: `${spin.value}deg` }],
    };
  });

  const thirdStateStyles = useAnimatedStyle(() => {
    const isVisible = state.value === 2;
    return {
      display: isVisible ? "flex" : "none",
    };
  });

  const fourthStateStyles = useAnimatedStyle(() => {
    const isVisible = state.value === 3;
    return {
      display: isVisible ? "flex" : "none",
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          state.value === 3
            ? (state.value = withTiming(0))
            : (state.value = withTiming(1 + state.value));
        }}
      >
        <Animated.View style={[styles.button, wrapperStyle]}>
          <Animated.Text style={[firstStateStyles]}>Next</Animated.Text>
          <Animated.Text style={[styles.error, thirdStateStyles]}>
            Error !
          </Animated.Text>
          <Animated.View style={secondStateStyle}>
            <Spinner />
          </Animated.View>
          <Animated.Text style={[fourthStateStyles]}>Weee!</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    width: 30,
    alignItems: "center",
    borderRadius: 15,
  },
  error: {
    color: "white",
    fontWeight: "700",
  },
});
