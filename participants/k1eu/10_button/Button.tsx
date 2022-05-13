import { Pressable, StyleSheet, Text, View } from "react-native";

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
  useDerivedValue,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";

import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";

type ButtonProps = {
  status: "default" | "loading" | "success" | "error";
};

type DefaultButtonContentProps = {
  isActive: SharedValue<number>;
};

const DefaultButtonContent = ({
  isActive
}: DefaultButtonContentProps) => {

  const loadingWrapperStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(isActive.value, [0, 1], [1, 0]),
    };
  }, []);

  return (
    <Animated.View
      style={[
        loadingWrapperStyles,
        [
          {
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          },
        ],
      ]}
    >
      <FontAwesome name="long-arrow-right" size={24} color="blue" />
    </Animated.View>
  );
};

type LoadingButtonContentProps = {
  isLoading: SharedValue<number>;
};

const LoadingButtonContent = ({
  isLoading,
  isError,
  isSuccess,
}: LoadingButtonContentProps) => {
  const rotation = useSharedValue(0);

  const loadingWrapperStyles = useAnimatedStyle(() => {
    const hasCompletedState = isError.value > 0 || isSuccess.value > 0;
    return {
      opacity: hasCompletedState ? withTiming(0) : isLoading.value,
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
      -1
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View style={[loadingWrapperStyles, { position: "absolute" }]}>
      <FontAwesome name="spinner" size={24} color="green" />
    </Animated.View>
  );
};

type SuccessButtonContentProps = {
  isLoading: SharedValue<number>;
  isSuccess: SharedValue<number>;
};

const SuccessButtonContent = ({
  isLoading,
  isSuccess,
}: SuccessButtonContentProps) => {
  const containerStyles = useAnimatedStyle(() => ({
    opacity: isSuccess.value,
  }));

  return (
    <Animated.View style={[containerStyles, { position: "absolute" }]}>
      <FontAwesome name="check" size={24} color="green" />
    </Animated.View>
  );
};

type FaillureButtonContentProps = {
  isLoading: SharedValue<number>;
  isError: SharedValue<number>;
};

const FaillureButtonContent = ({
  isLoading,
  isError,
}: FaillureButtonContentProps) => {
  const containerStyles = useAnimatedStyle(() => ({
    opacity: isError.value,
  }));

  return (
    <Animated.View style={[containerStyles, { position: "absolute" }]}>
      <FontAwesome name="times" size={24} color="red" />
    </Animated.View>
  );
};

const BUTTON_ACTIVE_SIZE = 100;
const BUTTON_INACTIVE_SIZE = 200;

const Button = ({ onPress }: ButtonProps) => {
  const isActive = useSharedValue(0);
  const isLoading = useSharedValue(0);
  const isSuccessful = useSharedValue(0);
  const isError = useSharedValue(0);

  // const isActive = useDerivedValue(() => {
  //   const progress = isLoading.value !== 0 || isSuccessful.value !== 0 || isError.value !== 0;
  //   return progress ? withTiming(1) : withTiming(0);
  // }, [isLoading, isSuccessful, isError]);

  const containerStyles = useAnimatedStyle(() => ({
    // justifyContent: "center",
    width: interpolate(
      isActive.value,
      [0, 1],
      [BUTTON_INACTIVE_SIZE, BUTTON_ACTIVE_SIZE],
      Extrapolate.CLAMP
    ),
  }));

  const handleOnPress = () => {
    onPress(isActive, isLoading, isSuccessful, isError);
  };

  return (
    <Pressable style={{ marginBottom: 20 }} onPress={handleOnPress}>
      <Animated.View
        style={[
          {
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: BUTTON_ACTIVE_SIZE / 2,
            height: BUTTON_ACTIVE_SIZE,
            borderColor: "black",
            justifyContent: "center",
            padding: 20,
            position: "relative",
            // width: BUTTON_INACTIVE_SIZE,
          },
          containerStyles,
        ]}
      >
        <DefaultButtonContent
          isActive={isActive}
        />
        <LoadingButtonContent
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccessful}
        />
        <SuccessButtonContent isLoading={isLoading} isSuccess={isSuccessful} />
        <FaillureButtonContent isLoading={isLoading} isError={isError} />
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
