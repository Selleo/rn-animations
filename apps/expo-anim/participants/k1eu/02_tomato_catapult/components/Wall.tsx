import React from "react";
import { View, useWindowDimensions } from "react-native";
import styles, { WALL_HEIGHT_SCALE, WALL_WIDTH_SCALE } from "../styles";

function Wall() {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={[
        styles.wall,
        {
          height: height * WALL_HEIGHT_SCALE,
          width: width * WALL_WIDTH_SCALE,
          transform: [
            { translateX: (-width * WALL_WIDTH_SCALE) / 2 },
            { translateY: (-height * WALL_HEIGHT_SCALE) / 2 },
          ],
        },
      ]}
    />
  );
}

export default Wall;
