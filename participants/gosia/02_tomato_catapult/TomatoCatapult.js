import {
  PanGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import Splash from "./splash.svg";
import Tomato from "./tomato.svg";

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
  },
  catapult: {
    backgroundColor: "black",
    width: 30,
    height: 150,
    position: "absolute",
    bottom: 0,
    left: 200,
    zIndex: 100,
  },
  gum: {
    backgroundColor: "brown",
    width: 120,
    height: 20,
    position: "absolute",
    bottom: 120,
    left: 50,
    zIndex: 101,
  },
  tomato: {
    position: "absolute",
    bottom: 120,
    right: 0,
  },
  splash: {
    position: "absolute",
    right: -10,
    bottom: 110,
  },
});

const Catapult = Animated.View;
const Gum = Animated.View;

const TomatoCatapult = () => {
  const [tomatoVisible, setTomatoVisible] = useState();
  const [splashVisible, setSplashVisible] = useState();
  const gumX = useSharedValue(50);
  const tomatoX = useSharedValue(50);

  const width = useSharedValue(120);
  const rotation = useSharedValue(90);
  let lastRotate = 0;

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = gumX.value;
      ctx.width = width.value;

      runOnJS(setSplashVisible)(false);
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) {
        gumX.value = ctx.startX + event.translationX;
        width.value = ctx.width + Math.abs(event.translationX);

        if (gumX.value < 20) {
          tomatoX.value = gumX.value;
          runOnJS(setTomatoVisible)(true);
        }
      }
    },
    onEnd: (_) => {
      tomatoX.value = withTiming(30 + width.value, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(setTomatoVisible)(false);
          runOnJS(setSplashVisible)(true);
        }
      });
      gumX.value = withSpring(50);
      width.value = withSpring(120);
    },
  });

  // const interpolatedAngle = interpolate(rotation.value, {
  //   inputRange: [-360, 360],
  //   outputRange: ["-360deg", "360deg"],
  // });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: gumX.value,
          // rotate: interpolatedAngle,
        },
      ],
      width: width.value,
    };
  });

  const tomatoStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tomatoX.value,
        },
      ],
    };
  });

  const splashStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tomatoX.value,
        },
      ],
    };
  });

  return (
    <View style={styles.view}>
      {splashVisible && (
        <Animated.View style={[styles.splash]}>
          <Splash height={60} width={60} />
        </Animated.View>
      )}
      {tomatoVisible && (
        <Animated.View style={[styles.tomato, tomatoStyles]}>
          <Tomato height={40} />
        </Animated.View>
      )}
      <Catapult style={styles.catapult} />

      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Gum style={[styles.gum, animatedStyles]} />
      </PanGestureHandler>
    </View>
  );
};

export default TomatoCatapult;
