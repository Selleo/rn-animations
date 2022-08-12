import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View, Text } from "react-native";
import {
  Canvas,
  Image,
  LinearGradient,
  Paint,
  RoundedRect,
  useFont,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Card = () => {
  const { width, height } = useWindowDimensions();
  const font = useFont(require("@assets/fonts/Roboto-Regular.ttf"), 12);
  const image = useImage(require("./kajetan-boruta.png"));
  const image2 = useImage(require("./bartosz-boruta.png"));

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, [progress]);

  const animatedViewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(progress.value * 100),
      },
    ],
  }));

  if (font === null) {
    return null;
  }

  const rectSize = {
    width: width * 0.8,
    height: width * 0.6,
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Animated.View style={animatedViewStyles}>
        <Canvas style={{ width: rectSize.width, height: rectSize.height }}>
          <RoundedRect
            width={rectSize.width}
            height={rectSize.height}
            x={0}
            y={0}
            r={25}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(256, 256)}
              colors={["blue", "yellow"]}
            />
          </RoundedRect>
          {image && (
            <Image
              image={image}
              x={0}
              y={0}
              width={rectSize.width / 2}
              height={rectSize.height}
            />
          )}
          {image2 && (
            <Image
              image={image2}
              x={50}
              y={0}
              width={rectSize.width / 2}
              height={rectSize.height}
            />
          )}
        </Canvas>
        <Text style={{ position: "absolute", fontWeight: 'bold', right: 10, bottom: 10 }}>
          Bartosz Boruta
        </Text>
      </Animated.View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
