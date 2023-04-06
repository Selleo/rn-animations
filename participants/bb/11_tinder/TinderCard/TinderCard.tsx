import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 40;

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  FadeIn,
  FadeOut,
  withTiming,
  FadeOutRight,
  RollInLeft,
  RollInRight,
  SlideOutRight,
  Keyframe,
  ZoomOutUp,
  ZoomOut,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export type Card = {
  image: ImageSourcePropType;
  name: string;
  age: string;
  id: number;
};

const TinderCard = ({
  image,
  name,
  age,
  onRemove,
  id,
}: Card & { onRemove: (id: Card["id"]) => void }) => {
  const x = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
    },
    onEnd: () => {
      if (x.value > 0 && x.value > width / 2 - 50) {
        runOnJS(onRemove)(id);
      } else if (x.value < 0 && x.value < -width / 2 + 50) {
        runOnJS(onRemove)(id);
      } else {
        x.value = withSpring(0);
      }
    },
  });

  const containerStyle = useAnimatedStyle(
    (): {
      transform: [
        {
          translateX: number;
          translateY: number;
          rotateZ: string;
          scale: number;
        }
      ];
    } => {
      return {
        transform: [
          { translateX: x.value },
          {
            translateY: interpolate(
              x.value,
              [-width / 2, 0, width / 2],
              [50, 0, 50],
              Extrapolate.CLAMP
            ),
          },
          {
            rotateZ: `${interpolate(
              x.value,
              [-width / 2, 0, width / 2],
              [-0.2, 0, 0.2],
              Extrapolate.CLAMP
            )}deg`,
          },
          {
            scale: interpolate(
              x.value,
              [-50, 0, 50],
              [1.1, 1, 1.1],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }
  );

  const likeIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [20, width / 2], [0, 1]),
    };
  });
  const dislikeIconStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(x.value, [-width / 2, -20], [1, 0]),
    };
  });

  return (
    <Animated.View
      exiting={ZoomOut.duration(500)}
      style={{
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.container, containerStyle]}>
          <View style={styles.iconsContainer}>
            <AnimatedIcon
              style={likeIconStyle}
              name="heart"
              size={40}
              color="red"
            />
            <AnimatedIcon
              style={dislikeIconStyle}
              name="heart-dislike"
              size={40}
              color="red"
            />
          </View>
          <Image source={image} style={styles.image} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{`${name}, ${age}`}</Text>
            <View style={styles.indicator} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 500,
    backgroundColor: "#31314d",
    borderRadius: 20,
    paddingBottom: 80,
  },
  iconsContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  indicator: {
    borderRadius: 10,
    width: 10,
    height: 10,
    backgroundColor: "#18d52d",
  },
  name: { fontSize: 24, color: "white", fontWeight: "bold" },
  nameContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: 80,
    padding: 20,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    flexDirection: "row",
  },
});
