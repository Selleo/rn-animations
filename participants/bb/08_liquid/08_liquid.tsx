import React, { useMemo, useState } from "react";
import { TouchableOpacity, Dimensions, StyleSheet, Image } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  withTiming,
  ZoomOutLeft,
  ZoomInRight,
} from "react-native-reanimated";

const COLORS = ["blue", "pink", "white"];
const IMAGES = [
  require("./images/0.png"),
  require("./images/1.png"),
  require("./images/2.png"),
  require("./images/3.png"),
  require("./images/4.png"),
];

const Text = ({ index }: { index: number }) => {
  return (
    <Animated.View
      style={styles.textWrapper}
      entering={ZoomInRight.duration(1000).delay(500)}
      exiting={ZoomOutLeft.duration(1000)}
    >
      <Image source={IMAGES[index]} />
      <Animated.Text style={styles.text}>
        Go to {COLORS[index]} button
      </Animated.Text>
    </Animated.View>
  );
};

const Liquid = () => {
  const step = useSharedValue(0);
  const animation = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const buttonWrapperStyles = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [0, 0.5, 1], [1, 12, 1]);
    const rotateY = interpolate(animation.value, [0, 0.5, 1], [0, -90, -180]);
    const translateX = interpolate(animation.value, [0, 0.5, 1], [0, 100, 0]);

    return {
      transform: [
        { perspective: 200 },
        { scale },
        { rotateY: `${rotateY}deg` },
        { translateX: `${translateX}%` },
      ],
    };
  });

  const buttonWrapperBackgroundStyles = useAnimatedStyle(() => {
    const base = COLORS[step.value % COLORS.length];
    const first = COLORS[(step.value + 1) % COLORS.length];
    const second = COLORS[(step.value + 2) % COLORS.length];

    const backgroundColor = interpolateColor(
      animation.value,
      [0, 0.001, 0.5, 0.5001, 0.9, 1],
      [first, first, first, base, base, second]
    );

    return {
      backgroundColor,
    };
  });

  const backgroundStyles = useAnimatedStyle(() => {
    const first = COLORS[step.value];
    const second = COLORS[(step.value + 1) % COLORS.length];

    const backgroundColor = interpolateColor(
      animation.value,
      [0, 0.001, 0.5, 0.501, 1],
      [first, first, first, second, second]
    );

    return {
      backgroundColor,
    };
  });

  const renderText = useMemo(() => {
    return <Text key={index} index={step.value} />;
  }, [index]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        backgroundStyles,
      ]}
    >
      {renderText}
      <Animated.View
        style={[
          styles.buttonWrapper,
          buttonWrapperStyles,
          buttonWrapperBackgroundStyles,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setIndex((index + 1) % COLORS.length);
            step.value = (step.value + 1) % COLORS.length;

            animation.value = 0;
            animation.value = withTiming(1, { duration: 1500 });
          }}
        >
          <Animated.View style={[styles.button]}></Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default Liquid;

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 150,
  },
  text: {
    fontSize: 25,
  },
  textWrapper: {
    marginBottom: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
