import { StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const cardHeight = (height - 300) / 3;

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
  switchTo: (mode: number, cardNumber: number) => void;
}) => {
  const gestureHander = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive: (event, ctx) => {},
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
    return { top: withSpring(0) };
  });

  return (
    <Animated.View
      style={[
        { backgroundColor: color, zIndex: zIndex },
        styles.wrapper,
        animStyles,
      ]}
    >
      <PanGestureHandler onGestureEvent={gestureHander}>
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => switchTo(2, index)}
        ></TouchableOpacity>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 20,
    width: width - 60,
    height: cardHeight,
    position: "absolute",
  },
});
