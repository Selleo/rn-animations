import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  withTiming,
  SlideOutDown,
  withDelay,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  delay: number;
}

const Button = (props: Props) => {
  const { onPress, delay } = props;

  const entering = () => {
    "worklet";
    const animations = {
      opacity: withDelay(delay, withTiming(1, { duration: 500 })),
      transform: [
        { rotate: withDelay(delay, withTiming("0deg", { duration: 1000 })) },
        { scale: withDelay(delay, withTiming(1, { duration: 1000 })) },
      ],
    };
    const initialValues = {
      opacity: 0,
      transform: [{ rotate: "90deg" }, { scale: 0.8 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 60,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Animated.View entering={entering} exiting={SlideOutDown}>
          <AntDesign name="pluscircle" size={60} color="#0099cc" />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
