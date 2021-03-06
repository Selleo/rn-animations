import React, { ReactNode, useEffect, useState } from "react";
import { useWindowDimensions, View, ViewProps, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ROTATION_ANGLE = 60;

export type StackProps<T> = Pick<ViewProps, "style"> & {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

function Stack<T>({ renderItem, data }: StackProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentItem = data[currentIndex];
  const nextItem = data[nextIndex];

  const translateX = useSharedValue(0);

  const { width: screenWidth } = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
  });

  const rotate = useDerivedValue(
    () =>
      interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION_ANGLE]
      ) + "deg"
  );

  const currentItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.6, 1]
    ),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.nextItemContainer}>
        {nextItem && (
          <Animated.View style={nextItemAnimatedStyle}>
            {renderItem(nextItem, nextIndex)}
          </Animated.View>
        )}
      </View>
      {currentItem && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={currentItemAnimatedStyle}>
            {renderItem(currentItem, currentIndex)}
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  nextItemContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Stack;
