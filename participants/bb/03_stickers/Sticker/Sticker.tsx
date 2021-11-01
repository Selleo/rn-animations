import React, { FC, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ImageSourcePropType } from "react-native";

import styles, { STICKER_HEIGHT } from "./styles";
import { PanGestureHandler } from "react-native-gesture-handler";

type Props = {
  id: number;
  source: ImageSourcePropType;
  imageIndex: number;
  lastZIndex: Animated.SharedValue<number>;
};

const TRESHOLD = -STICKER_HEIGHT * 1.5;

const Sticker: FC<Props> = (props) => {
  const zIndex = useSharedValue(props.imageIndex);
  const animationActive = useSharedValue(0);
  const stickerX = useSharedValue(0);
  const stickerY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      props.lastZIndex.value += 1;
      zIndex.value = props.lastZIndex.value;
      ctx.startX = stickerX.value;
      ctx.startY = stickerY.value;
      animationActive.value = withTiming(1);
    },
    onActive: (event, ctx) => {
      stickerX.value = ctx.startX + event.translationX;
      stickerY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      if (stickerY.value > TRESHOLD) {
        stickerX.value = withTiming(0);
        stickerY.value = withTiming(0);
      }

      animationActive.value = withTiming(0);
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: stickerX.value },
        { translateY: stickerY.value },
      ],
      shadowOpacity: interpolate(animationActive.value, [0, 1], [0, 0.6]),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
    };
  });

  return (
    <>
      <Animated.View style={styles.stickerContainer} />
      <Animated.View
        style={[
          containerStyle,
          {
            position: "absolute",
            left: props?.imageIndex * STICKER_HEIGHT,
          },
        ]}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.Image
            source={props?.source}
            style={[styles.image, imageStyle]}
          />
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default Sticker;
