import React, { FC } from "react";
import { Text, StyleSheet, Image, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  FadeOut,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface IProps {
  person: { name: string; url: string };
  onChoose: () => void;
}

export const Card: FC<IProps> = ({ person, onChoose }) => {
  const y = useSharedValue(0);
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
      x.value = ctx.startX + event.translationX;
      if (Math.abs(x.value) >= 100) {
        runOnJS(onChoose)();
      }
    },
    onEnd: (_) => {
      y.value = withSpring(0);
      x.value = withSpring(0);
    },
  });

  const cardStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
        { translateX: x.value },
        { rotateZ: x.value / 300 },
        { scale: 1 + Math.abs(x.value / 1000) },
      ],
    };
  });

  const rejectStyle = useAnimatedStyle(() => {
    if (x.value >= 0) {
      return { opacity: 0 };
    }
    return {
      opacity: Math.abs(x.value / 100),
    };
  });

  const acceptStyle = useAnimatedStyle(() => {
    if (x.value <= 0) {
      return { opacity: 0 };
    }
    return {
      opacity: Math.abs(x.value / 100),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        exiting={FadeOut.duration(1000)}
        style={[styles.card, cardStyles]}
      >
        <Image
          style={styles.image}
          source={{
            uri: person.url,
          }}
        />
        <Text style={styles.name}>{person.name}</Text>
        <Animated.View style={[styles.reject, rejectStyle]} />
        <Animated.View style={[styles.accept, acceptStyle]} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 500,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    position: "absolute",
    width: Dimensions.get("screen").width - 60,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 30,
    color: "white",
  },
  reject: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  accept: {
    backgroundColor: "green",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
