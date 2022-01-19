import { StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const cardHeight = (height - 220) / 3;

const HEADER_HEIGHT = 50;

const Card = ({
  color,
  zIndex,
  index,
  cardsState,
  switchTo,
}: {
  color: string;
  zIndex: number;
  index: number;
  cardsState: SharedValue<number>;
  switchTo: (mode: number, cardNumber?: number) => void;
}) => {
  const gestureHander = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive: (event, ctx) => {
      if (event.translationY < -40) {
        runOnJS(switchTo)(1);
      }
      if (event.translationY > 40) {
        runOnJS(switchTo)(0);
      }
    },
    onEnd: () => {},
  });

  const animStyles = useAnimatedStyle(() => {
    if (cardsState.value === 0) {
      const newVal = HEADER_HEIGHT + index * (cardHeight + 10);
      return { top: withSpring(newVal) };
    }
    if (cardsState.value === 1) {
      const newVal = HEADER_HEIGHT + index * 40;
      return { top: withSpring(newVal) };
    }
    console.log("return puste");
    return { top: withSpring(0) };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHander}>
      <Animated.View
        style={[
          { backgroundColor: color, zIndex: zIndex },
          styles.wrapper,
          animStyles,
        ]}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => switchTo(2, index)}
        ></TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    width: width - 10,
    height: cardHeight,
    position: "absolute",
  },
});
