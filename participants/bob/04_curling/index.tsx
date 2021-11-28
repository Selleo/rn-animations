import React, { useState } from "react";
import { View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import styles, {
  stoneStartingPosition,
  middle,
  targetMiddle,
  throwLine,
} from "./styles";

export default () => {
  const [store, setStore] = useState<number | null>(null);
  const stoneY = useSharedValue(stoneStartingPosition);
  const stoneX = useSharedValue(middle);
  const isMoving = useSharedValue(false);

  const setStoreWithTiming = (value: number) => {
    const cetnerStone = value;
    const centerTarget = targetMiddle;
    if (value < targetMiddle) {
      setStore(Math.max(100 - Math.floor(centerTarget - cetnerStone), 0));
    } else {
      setStore(Math.max(100 - Math.floor(cetnerStone - centerTarget), 0));
    }
    setTimeout(() => {
      setStore(null);
    }, 2500);
  };

  const pan1GestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = stoneY.value;
      ctx.x = stoneX.value;
    },
    onActive: (event, ctx) => {
      const newY = ctx.y + event.translationY;
      if (newY < throwLine && !isMoving.value) {
        isMoving.value = true;
        const distance = Math.abs(event.velocityY) * 1;
        stoneY.value = withSequence(
          withTiming(ctx.y - distance, {
            duration: distance * 4,
            easing: Easing.out(Easing.cubic),
          }),
          withTiming(ctx.y - distance, { duration: 1000 }, () => {
            runOnJS(setStoreWithTiming)(ctx.y - distance);
          }),
          withTiming(stoneStartingPosition, { duration: 0 }, () => {
            isMoving.value = false;
          })
        );
      } else {
        if (!isMoving.value) {
          stoneY.value = newY;
          stoneX.value = ctx.x + event.translationX;
        }
      }
    },
    onEnd: () => {
      if (!isMoving.value) {
        stoneY.value = stoneStartingPosition;
        stoneX.value = middle;
      }
    },
  });

  const stoneStyles = useAnimatedStyle(() => {
    return {
      top: stoneY.value,
      left: stoneX.value,
    };
  });

  return (
    <View style={styles.screen}>
      {!!store && <Text>Store: {store}</Text>}
      <View style={styles.target}></View>
      <View style={styles.trowingLine}></View>
      <PanGestureHandler onGestureEvent={pan1GestureHandler}>
        <Animated.View style={[styles.stone, stoneStyles]}></Animated.View>
      </PanGestureHandler>
    </View>
  );
};
