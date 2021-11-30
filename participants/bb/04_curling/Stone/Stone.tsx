import React, { useCallback } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
  useAnimatedGestureHandler,
  withDecay,
  runOnJS,
} from "react-native-reanimated";
import { withBouncing } from "react-native-redash";

import styles from "./styles";
import { POINT_SIZE, BALL_HEIGHT } from "../styles";

const { width, height } = Dimensions.get("window");
const POINT_CENTER_X = width / 2;
const POINT_CENTER_Y = POINT_SIZE / 2;

console.log({ POINT_CENTER_X, POINT_CENTER_Y, height });
type Props = {
  setDistance: React.Dispatch<React.SetStateAction<number>>;
};

const Stone: React.FC<Props> = ({ setDistance }) => {
  const headerHeight = useHeaderHeight();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const animationXActive = useSharedValue(0);
  const animationYActive = useSharedValue(0);
  const animationDone = useSharedValue(0);
  const bottom = useSharedValue(30);

  const TOP_EDGE = -height + headerHeight + 30 + BALL_HEIGHT;
  const CIRCLE_CENTER_Y = -TOP_EDGE - BALL_HEIGHT;

  useDerivedValue(() => {
    if (
      !animationXActive.value &&
      !animationYActive.value &&
      animationDone.value
    ) {
      const xOffset = Math.abs(translateX.value);
      const yOffset = Math.abs(CIRCLE_CENTER_Y + translateY.value);
      const score = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
      runOnJS(setDistance)(Number(score.toFixed(2)));
    }
  });

  const handleReset = useCallback(() => {
    if (
      !animationXActive.value &&
      !animationYActive.value &&
      animationDone.value
    ) {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      animationXActive.value = 1;
      animationYActive.value = 1;
      animationDone.value = 0;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.startX;
      translateY.value = event.translationY + ctx.startY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withBouncing(
        withDecay(
          {
            velocity: velocityY,
          },
          () => {
            animationYActive.value = 0;
          }
        ),
        TOP_EDGE,
        0
      );
      translateX.value = withBouncing(
        withDecay(
          {
            velocity: velocityX,
          },
          () => {
            animationXActive.value = 0;
            animationDone.value = 1;
          }
        ),
        -width / 2 + BALL_HEIGHT / 2,
        width / 2 - BALL_HEIGHT / 2
      );
    },
  });

  const stoneStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.stone, stoneStyle]}></Animated.View>
      </PanGestureHandler>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset} />
    </>
  );
};

export default Stone;
