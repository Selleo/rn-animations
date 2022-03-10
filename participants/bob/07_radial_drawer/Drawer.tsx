import { useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import SingleItem from "./SingleItem";

const { width, height } = Dimensions.get("screen");

function CustomDrawerContent(props) {
  const opened = useSharedValue(0);
  const radius = useSharedValue(0);
  const iterator = useSharedValue(0);

  const stylesA = useAnimatedStyle(() => {
    return {
      width: interpolate(opened.value, [0, 1], [40, 300]),
      height: interpolate(opened.value, [0, 1], [40, 300]),
      borderRadius: interpolate(opened.value, [0, 1], [20, 150]),
      top: interpolate(
        opened.value,
        [0, 1],
        [height / 2 - 20, height / 2 - 150]
      ),
      left: interpolate(opened.value, [0, 1], [-20, -150]),
      borderWidth: 1,
    };
  });

  const stylesB = useAnimatedStyle(() => {
    return {
      width: interpolate(opened.value, [0, 1], [40, 200]),
      height: interpolate(opened.value, [0, 1], [40, 200]),
      borderRadius: interpolate(opened.value, [0, 1], [20, 100]),
      top: interpolate(
        opened.value,
        [0, 1],
        [height / 2 - 20, height / 2 - 100]
      ),
      left: interpolate(opened.value, [0, 1], [-20, -100]),
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onEnd: () => {
      opened.value = withSpring(opened.value === 1 ? 0 : 1);
      radius.value = withSpring(opened.value === 1 ? 0 : 150);
    },
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = iterator.value;
    },
    onActive: (event, ctx) => {
      let newVal = ctx.startY + event.translationY;

      iterator.value = parseInt(newVal);
      console.log(iterator.value);
    },
  });

  const hide = (callback) => {
    opened.value = withSpring(0);
    radius.value = withSpring(0);
    runOnJS(callback)();
  };

  return (
    <>
      <Animated.View
        style={[
          {
            zIndex: 1000,
            borderColor: "red",
            position: "absolute",
            backgroundColor: "transparent",
          },
          stylesA,
        ]}
      >
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={{ width: "100%", height: "100%" }}>
            <TapGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {["Main", "Users", "Feed", "Article", "Managment"].map(
                  (val, index) => (
                    <SingleItem
                      opened={opened}
                      index={index}
                      iterator={iterator}
                      numberOfItems={5}
                      radius={radius}
                      where={val}
                      hide={hide}
                    />
                  )
                )}
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      <Animated.View
        style={[
          {
            zIndex: 100,
            borderColor: "red",
            position: "absolute",
            backgroundColor: "red",
          },
          stylesB,
        ]}
      ></Animated.View>
    </>
  );
}

export default CustomDrawerContent;
