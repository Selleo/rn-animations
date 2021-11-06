import React from "react";
import { Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./styles";
import { primaryColor, secondaryColor } from "@styles/constants";

type Props = {
  img: number;
  style?: object;
  onPress?: () => void;
};

function Avatar(props: Props) {
  const { img, style, onPress } = props;

  return (
    <LinearGradient
      colors={[primaryColor, secondaryColor]}
      style={[styles.gradient, style]}
    >
      <Pressable style={styles.container} onPress={onPress}>
        <Image
          source={img}
          style={styles.image}
        />
      </Pressable>
    </LinearGradient>
  );
}

export default Avatar;
