import React from "react";
import { Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles, { IMG_SIZE } from "./styles";
import { primaryColor, secondaryColor } from "@styles/constants";

type Props = {
  img: string;
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
          style={{
            height: IMG_SIZE,
            width: IMG_SIZE,
          }}
        />
      </Pressable>
    </LinearGradient>
  );
}

export default Avatar;
