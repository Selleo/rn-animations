import { PanGestureHandler } from "react-native-gesture-handler";
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  event,
  Value,
  cond,
  eq,
  add,
  set,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import Diamond from "./assets/diamond.svg";
import Cat from "./assets/cat.svg";
import Dog1 from "./assets/dog1.svg";
import Dog2 from "./assets/dog2.svg";
import Flower from "./assets/flower.svg";
import Phone from "./assets/phone.svg";
import ReactLogo from "./assets/react.svg";
import Star from "./assets/star.svg";

const stickers = [Cat, Diamond, Dog1, Dog2, Flower, Phone, ReactLogo, Star];

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
  },
});

const TomatoCatapult = () => {
  // const gumX = useSharedValue(50);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const gestureState = useSharedValue(-1);

  const offsetX = new Value(windowWidth / 2);
  const offsetY = new Value(windowHeight / 2);

  // const panGestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx) => {
  //     // ctx.startX = gumX.value;
  //   },
  //   onActive: (event, ctx) => {
  //     // gumX.value = ctx.startX + event.translationX;
  //   },
  //   onEnd: (_) => {},
  // });

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX.value,
        translationY: dragY.value,
        state: gestureState.value,
      },
    },
  ]);

  const transX = cond(
    eq(gestureState, 1),
    add(offsetX, dragX),
    set(offsetX, add(offsetX, dragX))
  );

  const transY = cond(
    eq(gestureState, 1),
    add(offsetY, dragY),
    set(offsetY, add(offsetY, dragY))
  );

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: gumX.value,
  //       },
  //     ],
  //   };
  // });

  return (
    <View style={styles.view}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <>
          {stickers.map((Sticker, index) => (
            <Sticker
              style={{
                transform: [
                  {
                    translateX: transX,
                  },
                  {
                    translateY: transY,
                  },
                ],
              }}
              height={50}
              width={50}
              key={index}
            />
          ))}
        </>
      </PanGestureHandler>
    </View>
  );
};

export default TomatoCatapult;
