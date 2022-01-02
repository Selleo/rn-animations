import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  Easing,
  withTiming,
  FadeIn,
  ZoomOut,
  SlideOutDown,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const Header = () => {
  return (
    <Animated.View
      entering={FadeIn.delay(500)}
      exiting={SlideOutDown}
      style={{
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>Wallet</Text>
    </Animated.View>
  );
};

export default Header;
