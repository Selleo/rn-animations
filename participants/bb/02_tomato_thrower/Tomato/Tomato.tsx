import React, { FC } from "react";
import { View, Text } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import styles from "./styles";

type Props = {
  value: any;
  x: any;
  y: any;
};

const Tomato: FC<Props> = ({ value, x, y }) => {
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: value.value ? 1 : 0.8 },
      ],
    };
  });

  return (
    <Animated.View style={[styles.background, style]}>
      {/* {value.value} */}
    </Animated.View>
  );
};

export default Tomato;
