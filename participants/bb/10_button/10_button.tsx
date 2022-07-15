import styles from "@components/Avatar/styles";
import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, Pressable } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolate,
  withRepeat,
  Easing,
  cancelAnimation,
  withDelay,
  SharedValue,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BUTTON_SIZE = 300;
const BUTTON_ACTIVE_SIZE = 100;

const Spinner = ({ loading }: { loading: SharedValue<number> }) => {
  const rotation = useSharedValue(0);
  const iconSpinnerStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(loading.value, [0, 0.5, 1], [0, 1, 1]),
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View style={iconSpinnerStyles}>
      <EvilIcons color="#2a9eb5" size={30} name="spinner-3" />
    </Animated.View>
  );
};

const Success = ({ success }: { success: SharedValue<number> }) => {
  const rotation = useSharedValue(0);
  const iconSpinnerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: "#49ba8a",
      borderRadius: BUTTON_ACTIVE_SIZE / 2,
      opacity: interpolate(success.value, [0, 1], [0, 1]),
      width: interpolate(success.value, [0, 1], [0, BUTTON_ACTIVE_SIZE]),
      height: interpolate(success.value, [0, 1], [0, BUTTON_ACTIVE_SIZE]),
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withTiming(360, {
      duration: 300,
      easing: Easing.linear,
    });
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View style={iconSpinnerStyles}>
      <EvilIcons color="#ffffff" size={30} name="check" />
    </Animated.View>
  );
};

const Next = ({
  success,
  loading,
  error,
}: {
  success: SharedValue<number>;
  loading: SharedValue<number>;
  error: SharedValue<number>;
}) => {
  const iconNextStyles = useAnimatedStyle(() => ({
    position: "absolute",
    opacity:
      success.value || error.value
        ? 0
        : interpolate(loading.value, [0, 0.5, 1], [1, 1, 0]),
    transform: [
      {
        rotateZ: `${loading.value * 360}deg`,
      },
    ],
  }));
  return (
    <Animated.View style={iconNextStyles}>
      <EvilIcons
        color="#2a9eb5"
        size={BUTTON_ACTIVE_SIZE}
        name="chevron-right"
      />
    </Animated.View>
  );
};

const Button = () => {
  const active = useSharedValue(0);
  const loading = useSharedValue(0);
  const success = useSharedValue(0);
  const error = useSharedValue(0);

  const containerStyles = useAnimatedStyle(() => ({
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: BUTTON_ACTIVE_SIZE / 2,
    height: BUTTON_ACTIVE_SIZE,
    justifyContent: "center",
    width: interpolate(
      active.value,
      [0, 1],
      [BUTTON_SIZE, BUTTON_ACTIVE_SIZE],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View
      style={{
        backgroundColor: "#f5e7e4",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedPressable
        onPress={() => {
          if (!active.value) {
            active.value = withTiming(1);
            success.value = withTiming(0);
            error.value = withTiming(0);
            loading.value = withTiming(1, {}, (finished) => {
              if (finished) {
                success.value = withDelay(1000, withTiming(1));
                loading.value = withDelay(1000, withTiming(0));
              }
            });
          } else {
            active.value = withTiming(0);
            success.value = withTiming(0);
            loading.value = 0;
          }
        }}
        style={containerStyles}
      >
        <Next loading={loading} error={error} success={success} />
        <Spinner loading={loading} />
        <Success success={success} />
      </AnimatedPressable>
    </View>
  );
};

export default Button;
