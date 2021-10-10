import React, { useState } from "react";
import { View, Dimensions } from "react-native";
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
} from "react-native-reanimated";

import Tomato from "./components/Tomato";
import TomatoSplash from "./components/TomatoSplash";
import Wall from "./components/Wall";
import styles, {
  WALL_HEIGHT_SCALE,
  WALL_WIDTH_SCALE,
  TOMATO_HEIGHT,
  TOMATO_WIDTH,
} from "./styles";

type Splash = {
  top: number;
  left: number;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get("screen");

const LINE_Y_SCALE = 10;
const INITIAL_BEND_X = width / 2;
const INITIAL_BEND_Y = (50 * LINE_Y_SCALE) / 100;
const TOMATO_INITIAL_X = INITIAL_BEND_X - TOMATO_WIDTH / 2;
const TOMATO_INITIAL_Y = height / 2 + INITIAL_BEND_Y - TOMATO_WIDTH / 2;

const BOUNDARIES = {
  minX: Math.ceil((width * (1 - WALL_WIDTH_SCALE)) / 2),
  maxX: Math.floor(
    width * (WALL_WIDTH_SCALE + (1 - WALL_WIDTH_SCALE) / 2) - TOMATO_WIDTH
  ),
  minY: Math.ceil((height * (1 - WALL_HEIGHT_SCALE)) / 2),
  maxY: Math.floor(height / 2 - TOMATO_HEIGHT / 2),
};

export default function AnimatedStyleUpdateExample() {
  const [splashes, setSplashes] = useState<Splash[]>([] as Splash[]);
  const { minX, maxX, minY, maxY } = BOUNDARIES;

  const curveY = useSharedValue(INITIAL_BEND_Y);
  const curveX = useSharedValue(INITIAL_BEND_X);
  const tomatoX = useSharedValue(TOMATO_INITIAL_X);
  const tomatoY = useSharedValue(TOMATO_INITIAL_Y);
  const isTomatoVisible = useSharedValue(true);

  const addNewSplash = (splash: Splash) => {
    setSplashes([...splashes, { top: splash.top, left: splash.left }]);
  };

  const delayTomato = () => {
    isTomatoVisible.value = true;
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (
      _,
      ctx: { y: number; x: number; tomatoX: number; tomatoY: number }
    ) => {
      tomatoX.value = TOMATO_INITIAL_X;
      tomatoY.value = TOMATO_INITIAL_Y;
      runOnJS(delayTomato)(); //prevents tomato from appearing on old splash point
      ctx.y = curveY.value;
      ctx.x = curveX.value;
      ctx.tomatoY = tomatoY.value;
      ctx.tomatoX = tomatoX.value;
    },
    onActive: (event, ctx) => {
      curveX.value = ctx.x + event.translationX;
      curveY.value = ctx.y + event.translationY * 0.2;
      tomatoX.value = ctx.tomatoX + event.translationX / 2;
      tomatoY.value = ctx.tomatoY + event.translationY;
    },
    onEnd: () => {
      const randomXDestination = Math.random() * (maxX - minX) + minX;
      const randomYDestination = Math.random() * (maxY - minY) + minY;

      if (curveY.value > INITIAL_BEND_Y) {
        tomatoX.value = withTiming(randomXDestination);
        tomatoY.value = withTiming(randomYDestination, {}, (finished) => {
          if (finished) {
            isTomatoVisible.value = false;
            runOnJS(addNewSplash)({
              top: randomYDestination,
              left: randomXDestination,
            });
          }
        });
      } else {
        tomatoX.value = withSpring(TOMATO_INITIAL_X);
        tomatoY.value = withSpring(TOMATO_INITIAL_Y);
      }
      curveX.value = withSpring(INITIAL_BEND_X);
      curveY.value = withSpring(INITIAL_BEND_Y);
    },
  });

  const animatedProps = useAnimatedProps(() => {
    const path = `
    M 1 1 Q ${curveX.value} ${curveY.value} ${width} 1
    `;
    return {
      d: path,
    };
  });

  const animatedStylesTomato = useAnimatedStyle(() => ({
    top: tomatoY.value,
    left: tomatoX.value,
    opacity: isTomatoVisible.value ? 1 : 0,
  }));

  const renderSplashes = () =>
    splashes.map((splash, i) => (
      <TomatoSplash
        key={i}
        style={{
          left: splash.left,
          top: splash.top,
        }}
      />
    ));

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <AnimatedSvg
            style={{
              height: height,
              width: width,
            }}
          >
            <AnimatedPath
              animatedProps={animatedProps}
              scaleY={LINE_Y_SCALE}
              y={height / 2}
              stroke="black"
            />
          </AnimatedSvg>
        </PanGestureHandler>
      </View>
      <Wall />
      <Tomato style={[styles.tomato, animatedStylesTomato]} />
      {renderSplashes()}
    </View>
  );
}
