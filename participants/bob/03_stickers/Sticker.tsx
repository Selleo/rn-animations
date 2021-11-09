import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const bottom = Dimensions.get("screen").height;

const Sticker = ({ children, zIndex = 0, initialX, increaseZindex }) => {
  const sticker1Pressing = useSharedValue(0);
  const sticker1X = useSharedValue(initialX);
  const sticker1Y = useSharedValue(bottom - 200);

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      sticker1Pressing.value = withTiming(1, { duration: 1700 });
      runOnJS(increaseZindex)();
    },
  });

  const pan1GestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = sticker1Y.value;
      ctx.startX = sticker1X.value;
    },
    onActive: (event, ctx) => {
      if (sticker1Pressing.value === 1) {
        sticker1Y.value = ctx.startY + event.translationY;
        sticker1X.value = ctx.startX + event.translationX;
      }
    },
    onEnd: () => {
      sticker1Pressing.value = withSpring(0);
    },
  });

  const sticker1Style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      shadowColor: "#000",
      shadowOffset: {
        width: -10,
        height: -10,
      },
      shadowOpacity: interpolate(sticker1Pressing.value, [0, 1], [0, 0.8]),
      shadowRadius: 12.19,
      transform: [
        { translateY: Math.round(sticker1Y.value || 0) },
        { translateX: Math.round(sticker1X.value || 0) },
        {
          skewY: `${interpolate(sticker1Pressing.value, [0, 1], [0, 30])}deg`,
        },
      ],
      zIndex,
      width: 150,
      height: 150,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={pan1GestureHandler}>
      <Animated.View style={sticker1Style}>
        <TapGestureHandler onGestureEvent={gestureHandler1}>
          <Animated.View>{children}</Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Sticker;
