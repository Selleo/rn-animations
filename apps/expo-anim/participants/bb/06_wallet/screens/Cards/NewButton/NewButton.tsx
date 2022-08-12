import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { View, Text } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";

type Props = {
  showNewButton: Animated.SharedValue<number>;
};

const NewButton: React.FC<Props> = ({ showNewButton }) => {
  const containerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(showNewButton.value ? 1 : 0.2, { duration: 1000 }),
      transform: [{ translateY: withTiming(showNewButton.value ? -20 : 110) }],
    };
  });

  const iconContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withTiming(showNewButton.value ? "45deg" : "0deg") },
      ],
    };
  });

  return (
    <Animated.View style={[containerStyles, styles.container]}>
      <Animated.View style={iconContainerStyles}>
        <AntDesign color="white" size={32} name="close" style={styles.icon} />
      </Animated.View>
    </Animated.View>
  );
};

export default NewButton;
