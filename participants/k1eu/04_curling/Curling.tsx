import React, { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  withDecay,
} from "react-native-reanimated";
import { withBouncing } from "react-native-redash";

import Tomato from "./components/Tomato";
import TomatoSplash from "./components/TomatoSplash";
import Wall from "./components/Wall";
import styles, { TOMATO_HEIGHT, TOMATO_WIDTH } from "./styles";

type Splash = {
  top: number;
  left: number;
};

type AnimationContext = {
  y: number;
  x: number;
  tomatoX: number;
  tomatoY: number;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get("screen");

const LINE_Y_SCALE = 10;
const INITIAL_BEND_X = width / 2;
const INITIAL_BEND_Y = (50 * LINE_Y_SCALE) / 100;
const TOMATO_INITIAL_X = INITIAL_BEND_X - TOMATO_WIDTH / 2;
const TOMATO_INITIAL_Y = height / 2 + INITIAL_BEND_Y - TOMATO_WIDTH / 2;

const AIM_CENTER_X = width / 2 
const AIM_CENTER_Y = 120

const TOMATO_START_X  = width / 2
const TOMATO_START_Y = height - 80

export default function Curling() {
  const [distance, setDistance] = useState(null);
  const tomatoX = useSharedValue(0);
  const tomatoY = useSharedValue(0);

  const reset = () => {
    setTimeout(() => {
      tomatoX.value = 0
      tomatoY.value = 0
    }, 1000)
  }

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: AnimationContext) => {
      ctx.tomatoY = tomatoY.value;
      ctx.tomatoX = tomatoX.value;
    },
    onActive: (event, ctx) => {
      tomatoX.value = ctx.tomatoX + event.translationX
      tomatoY.value = ctx.tomatoY + event.translationY
    },
    onEnd: (event, ctx) => {
      tomatoY.value = withBouncing(
        withDecay(
          {
            velocity: event.velocityY,
          }, () => {
            runOnJS(setDistance)({
              // x: AIM_CENTER_X - Math.abs(TOMATO_START_X - tomatoX.value + event.translationX),
              x: AIM_CENTER_X - event.x,
              // y: Math.abs(AIM_CENTER_Y - tomatoY.value + event.translationY),
              y: AIM_CENTER_Y - event.y,
            });
            runOnJS(reset)();
          }
        ),
        -height + 160 + 100 / 2,
        0
      );

      tomatoX.value = withBouncing(
        withDecay(
          {
            velocity: event.velocityX,
          }
        ),
        -width / 2 + 100 / 2,
        width / 2 - 100 / 2
      );
    },
  }
  );

  const animatedStylesTomato = useAnimatedStyle(() => ({
    bottom: 30,
    transform: [
      { translateX: tomatoX.value },
      { translateY: tomatoY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* <Text>{distance && distance.x}</Text>
      <Text>{distance && distance.y}</Text> */}
      <View style={{ top: 20, position: 'absolute', height: 200, width: 200, backgroundColor: 'green', borderRadius: 100 }} />
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.ball,animatedStylesTomato ]} />
        </PanGestureHandler>
        <View style={{ top: height * 0.7, width, height: 10, backgroundColor: 'red', position: 'absolute' }} />
    </View>
  );
}
