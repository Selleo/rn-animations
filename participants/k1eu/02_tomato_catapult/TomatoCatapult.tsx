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
import styles, { TOMATO_HEIGHT, TOMATO_WIDTH } from "./styles";

type Splash = {
  top: number;
  left: number;
};

type AnimationContext = {
  y: number,
  x: number,
  tomatoX: number,
  tomatoY: number,
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { width, height } = Dimensions.get("screen");

const LINE_Y_SCALE = 10;
const INITIAL_BEND_X = width / 2;
const INITIAL_BEND_Y = (50 * LINE_Y_SCALE) / 100;
const TOMATO_INITIAL_X = INITIAL_BEND_X - TOMATO_WIDTH / 2;
const TOMATO_INITIAL_Y = height / 2 + INITIAL_BEND_Y - TOMATO_WIDTH / 2;

export default function AnimatedStyleUpdateExample() {
  const [splashes, setSplashes] = useState<Splash[]>([] as Splash[]);

  const curveY = useSharedValue(INITIAL_BEND_Y);
  const curveX = useSharedValue(INITIAL_BEND_X);
  const tomatoX = useSharedValue(TOMATO_INITIAL_X);
  const tomatoY = useSharedValue(TOMATO_INITIAL_Y);
  const isTomatoVisible = useSharedValue(true);

  const addNewSplash = (splash: Splash) => {
    setSplashes([...splashes, { top: splash.top, left: splash.left }]);
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: AnimationContext ) => {
      tomatoX.value = TOMATO_INITIAL_X;
      tomatoY.value = TOMATO_INITIAL_Y;
      ctx.y = curveY.value;
      ctx.x = curveX.value;
      ctx.tomatoY = tomatoY.value;
      ctx.tomatoX = tomatoX.value;
    },
    onActive: (event, ctx) => {
      isTomatoVisible.value = true;
      curveX.value = ctx.x + event.translationX;
      curveY.value = ctx.y + event.translationY * 0.2;
      tomatoX.value = ctx.tomatoX + event.translationX / 2;
      tomatoY.value = ctx.tomatoY + event.translationY;
    },
    onEnd: () => {
      const desiredXDestination = width - tomatoX.value - TOMATO_WIDTH;
      const desiredYDestination = height - tomatoY.value - TOMATO_HEIGHT;

      if (curveY.value > INITIAL_BEND_Y) {
        tomatoX.value = withTiming(desiredXDestination);
        tomatoY.value = withTiming(desiredYDestination, {}, (finished) => {
          if (finished) {
            isTomatoVisible.value = false;
            runOnJS(addNewSplash)({
              top: desiredYDestination,
              left: desiredXDestination,
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
