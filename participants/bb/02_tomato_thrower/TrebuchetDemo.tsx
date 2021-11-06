import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { interpolatePath, parse } from "react-native-redash";

import Catapult from "./Catapult";
import Slider from "./Slider";
import Tomato from "./Tomato";

import styles from "./styles";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const startPathBag = parse("M41.636 20.716L47.347 1.44h27.13l6.426 16.956z");
const endPathBag = parse("M43.655 153.153l5.712 19.277h27.13l6.425-16.956z");

const startPathArm = parse(
  "M54.007 83.9l3.213 70.146 10.174.535-1.785-70.502z"
);
const endPathArm = parse(
  "M52.998 83.657l3.212-70.145 10.174-.535-1.785 70.502z"
);

const TomatoThrower = () => {
  const value = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const animatedBag = useAnimatedProps(() => {
    const path = interpolatePath(
      value.value,
      [0, 1],
      [startPathBag, endPathBag]
    );

    return {
      d: path,
    };
  });

  const animatedArm = useAnimatedProps(() => {
    const path = interpolatePath(
      value.value,
      [0, 1],
      [startPathArm, endPathArm]
    );

    return {
      d: path,
    };
  });

  return (
    <>
      <Catapult style={styles.container} />
      <AnimatedSvg
        style={styles.container}
        width={503.001}
        height={400}
        viewBox="0 0 133.086 200"
      >
        <AnimatedPath
          animatedProps={animatedBag}
          fill="#999"
          stroke="#000"
          strokeWidth={0.265}
        />
        <AnimatedPath
          animatedProps={animatedArm}
          fill="#333"
          stroke="#000"
          strokeWidth={0.265}
        />
      </AnimatedSvg>
      <Slider container={styles.sliderX} translate={y} />
      <Slider container={styles.sliderY} translate={x} horizontal={true} />
      <Tomato value={value} x={x} y={y} />
      <Pressable
        style={styles.button}
        onPress={() => {
          value.value = value.value
            ? withTiming(0)
            : withTiming(1, { duration: 5000 });
        }}
      />
    </>
  );
};

export default TomatoThrower;
