import React from "react";
import { View, Text } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  ZoomIn,
} from "react-native-reanimated";
import { R, r, c, segment } from "./constants";

import { styles } from "./style";

interface MenuItemProps {
  label: string;
  index: number;
  rotation: any;
  itemsLength: number;
}

const MenuItem = ({ label, index, rotation, itemsLength }: MenuItemProps) => {
  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: c },
        { translateY: c },
        {
          rotate: `${((index + rotation.value) % itemsLength) * segment}rad`,
        },
        { translateY: -R / 2 },
        {
          rotateZ: `${(-(index + rotation.value) % itemsLength) * segment} rad`,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.item_container, animatedRotation]}>
      <View style={styles.item}></View>
      <Animated.Text
        entering={FadeIn.delay(
          (300 * (index + rotation.value)) % itemsLength
        ).duration(800)}
        style={styles.label}
      >
        {label}
      </Animated.Text>
    </Animated.View>
  );
};

export default MenuItem;
