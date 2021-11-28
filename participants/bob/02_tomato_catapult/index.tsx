import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

import SplashedPotato from "./SplashedPotato";
import styles from "./styles";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width, height } = Dimensions.get("screen");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const maxXPotato = 250;
const maxYPotato = 650;

const newPotato = () => {
  return { x: getRandomInt(maxXPotato), y: getRandomInt(maxYPotato) };
};

export default () => {
  const [potatos, setPotatos] = useState([newPotato()]);
  const screenWith = useSharedValue(width);
  const y = useSharedValue(20);
  const x = useSharedValue(width / 2);
  const yRelative = useSharedValue(20);
  const potatoVisibility = useSharedValue(0);

  const addNewPotato = () => {
    setPotatos((prevVal) => [...prevVal, newPotato()]);
  };

  const ropeProp = useAnimatedProps(() => {
    const yTransition = Math.abs(y.value / 10);
    const reference = screenWith.value / 50;
    const circleCenter = x.value / reference;
    const newPath = `M 0 2 C ${circleCenter - 4} ${yTransition} ${
      circleCenter + 4
    } ${yTransition} 50 2`;
    return {
      d: newPath,
      strokeWidth: 3 - y.value / 300,
    };
  });

  const potatoProps = useAnimatedProps(() => {
    const reference = screenWith.value / 50;
    const circleCenter = x.value / reference;
    return {
      cx: circleCenter,
      cy: interpolate(yRelative.value, [300, 800], [0, 20]),
      opacity: potatoVisibility.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = y.value;
      ctx.startX = event.absoluteX;
      ctx.startYRel = event.absoluteY;
      potatoVisibility.value = withTiming(1, { duration: 200 });
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
      yRelative.value = ctx.startYRel + event.translationY;
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      y.value = withSpring(20);
      yRelative.value = withSpring(-200);

      x.value = withSpring(width / 2);
      potatoVisibility.value = withTiming(0, { duration: 300 });
      runOnJS(addNewPotato)();
    },
  });

  return (
    <View style={styles.main}>
      <PanGestureHandler
        style={{ elevation: 4 }}
        onGestureEvent={gestureHandler}
      >
        <Animated.View style={{ zIndex: 4, elevation: 4 }}>
          <AnimatedSvg
            style={styles.touchable}
            viewBox="5 5 40 40"
            width={width}
            height={height - 10}
          >
            <AnimatedCircle r={4} fill="red" animatedProps={potatoProps} />
            <AnimatedPath stroke="black" animatedProps={ropeProp} />
          </AnimatedSvg>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.wall}>
        {potatos.map((potato, index) => (
          <SplashedPotato
            key={index}
            style={{
              zIndex: 100,
              position: "absolute",
              marginLeft: potato.x,
              marginTop: potato.y,
            }}
            width={60}
            height={60}
          ></SplashedPotato>
        ))}
      </View>
    </View>
  );
};
