import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedProps,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import splash from "./splash.png";
import tomato from "./tomato.png";

const { width, height } = Dimensions.get("window");

import Svg, { Path, G } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BASE_Y_POINT = 5;
const BASE_X_POINT = 18;
const TOMATO_SIZE = 30;
const TOMATO_X_POINT = width / 2 - 25;
const TOMATO_Y_POINT = 580;

const TomatoThrower = () => {
  const [tomatoes, setTomatoes] = useState([]);
  const [points, setPoints] = useState(0);
  const isStringMoving = useSharedValue(0);
  const isTomatoMoving = useSharedValue(0);
  const x = useSharedValue(BASE_X_POINT);
  const y = useSharedValue(BASE_Y_POINT);
  const tomatoX = useSharedValue(TOMATO_X_POINT);
  const tomatoY = useSharedValue(TOMATO_Y_POINT);

  const savedTomatoX = useSharedValue(TOMATO_X_POINT);
  const savedTomatoY = useSharedValue(TOMATO_Y_POINT);

  const addTomato = (x, y) => {
    if (x > 150 && x < 250 && y > 120 && y < 240) {
      setPoints(points + 100);
    } else {
      setPoints(points + 1);
    }

    setTomatoes([...tomatoes, { x, y }]);
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      tomatoX.value = TOMATO_X_POINT;
      tomatoY.value = TOMATO_Y_POINT;

      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.tomatoX = tomatoX.value;
      ctx.tomatoY = tomatoY.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX * 0.2;
      y.value = ctx.startY + event.translationY * 0.2;
      isStringMoving.value = 1;
      isTomatoMoving.value = 1;

      savedTomatoX.value = ctx.startX + event.translationX;
      savedTomatoY.value = ctx.startY + event.translationY;

      tomatoX.value = ctx.tomatoX + event.translationX;
      tomatoY.value = ctx.tomatoY + event.translationY * 0.8;
    },
    onEnd: (_) => {
      x.value = withSpring(BASE_X_POINT);
      y.value = withSpring(BASE_Y_POINT, {}, (finished) => {
        if (finished) {
          isStringMoving.value = 0;
        }
      });

      const duration = interpolate(savedTomatoY.value, [0, 1000], [250, 2000]);

      tomatoX.value = withTiming(TOMATO_X_POINT - savedTomatoX.value, {
        duration,
      });
      tomatoY.value = withTiming(
        TOMATO_Y_POINT -
          savedTomatoY.value *
            interpolate(
              savedTomatoY.value,
              [0, 300],
              [1, 2],
              Extrapolate.CLAMP
            ),
        {
          duration,
        },
        (finished) => {
          if (finished) {
            runOnJS(addTomato)(tomatoX.value, tomatoY.value);
            isTomatoMoving.value = 0;
          }
        }
      );
    },
  });

  const animatedStringProps = useAnimatedProps(() => {
    return {
      d: `M 5 5 Q ${x.value} ${y.value} 36 5`,
    };
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tomatoX.value }, { translateY: tomatoY.value }],
    };
  });

  return (
    <View>
      <Text style={styles.points}>{points}</Text>

      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <AnimatedSvg
          width={width * 0.95}
          height={height}
          viewBox="0 0 40.392 32.755"
        >
          <G stroke="#000" y={30} strokeWidth={0.265}>
            <Path
              d="M.138 2.883l.378 1.432L15.237 18.7l1.849 3.683-1.135 10.239h9.638l-2.444-10.167 1.373-4.112L40.225 3.351l-1.342-2.314-2.75-.881-6.264 8.887-7.477 7.508-2.871 1.436-8.948-7.192-5.238-9.652L3.401.206.608 1.58z"
              fill="#a97a42"
            />
            <Path
              d="M6.346 2.392L1.404 6.118 3.19 7.903l4.139-4.44zM33.758 2.294l5.349 4.087M39.107 6.381l-1.738 1.075-4.325-3.377.714-1.785h0"
              fill="#000000"
            />
            <AnimatedPath animatedProps={animatedStringProps} strokeWidth={2} />
          </G>
          <Animated.Image source={tomato} style={[styles.tomato, style]} />
          {tomatoes.map((tomato) => (
            <Image
              source={splash}
              key={`${tomato?.y} ${tomato?.y}`}
              style={[
                styles.splash,
                { top: tomato?.y - 15, left: tomato?.x - 15 },
              ]}
            />
          ))}
        </AnimatedSvg>
      </PanGestureHandler>
    </View>
  );
};

export default TomatoThrower;

const styles = StyleSheet.create({
  czyToKovson: {
    position: "absolute",
    top: 40,
    width: width,
    height: width,
  },
  points: { top: 120, left: 10 },
  splash: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  tomato: {
    width: TOMATO_SIZE,
    height: TOMATO_SIZE,
  },
});
