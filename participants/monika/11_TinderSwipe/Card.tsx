import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const MARGIN_H = 20;
const MARGIN_TOP = 100;

interface CardProps {
  age: number;
  image: string;
  name: string;
}

const Card = ({ name, age, image }: CardProps) => {
  const cardXPosition = useSharedValue(0);
  const cardYPosition = useSharedValue(0);
  const orientation = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      orientation.value = event.absoluteY > HEIGHT / 2 ? -1 : 1;
    },
    onActive: (event, ctx) => {
      cardXPosition.value = event.translationX;
      cardYPosition.value = event.translationY;
    },
    onEnd: (event, ctx) => {
      if (cardXPosition.value > 150) {
        return (
          (cardXPosition.value = withTiming(WIDTH * 2, { duration: 500 })),
          (cardYPosition.value = withTiming(HEIGHT / 2, { duration: 500 }))
        );
      } else if (cardXPosition.value < -150) {
        return (
          (cardXPosition.value = withTiming(-WIDTH * 2, { duration: 500 })),
          (cardYPosition.value = withTiming(HEIGHT / 2, { duration: 500 }))
        );
      }
      return (
        (cardXPosition.value = withTiming(0, { duration: 500 })),
        (cardYPosition.value = withTiming(0, { duration: 500 }))
      );
    },
  });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: "#3F5D87",
    borderRadius: 20,
    borderWidth: 3,
    height: HEIGHT - 2 * MARGIN_TOP,
    left: MARGIN_H,
    overflow: "hidden",
    position: "absolute",
    top: MARGIN_TOP,
    width: WIDTH - 2 * MARGIN_H,
    transform: [
      { translateY: Math.round(cardYPosition.value || 0) },
      { translateX: Math.round(cardXPosition.value || 0) },
      { rotate: `${(cardXPosition.value * orientation.value) / 20}deg` },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={cardAnimatedStyle}>
        <Image source={{ uri: image }} style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: "#3F5D87",
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            {name}, {age}
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Card;
