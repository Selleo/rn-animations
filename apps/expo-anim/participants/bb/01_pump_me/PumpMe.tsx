import React, { FC } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback, View } from "react-native";

import styles, { MAX_SIZE } from "./styles";

type Props = {};

const BASE_SIZE = 80;
const DURATION = 500;

const PumpMe: FC<Props> = () => {
  const size = useSharedValue(BASE_SIZE);

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: size.value === MAX_SIZE ? "aqua" : "blue",
      height: size.value,
      width: size.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: size.value === MAX_SIZE ? 1 : 0,
    };
  });

  return (
    <View>
      <TouchableWithoutFeedback
        onPressIn={() => {
          size.value = withTiming(MAX_SIZE, { duration: DURATION });
        }}
        onPressOut={() => {
          size.value = withTiming(BASE_SIZE, { duration: DURATION });
        }}
      >
        <Animated.View style={[styles.button, containerStyle]}>
          <Animated.Text style={textStyle}>
            Stop it! I'll explode in a moment
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PumpMe;
