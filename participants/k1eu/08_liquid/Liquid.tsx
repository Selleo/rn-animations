import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  interpolateColors,
  interpolateNode,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const pink = "#FAAFD4";
const white = "#FFFFFF";
const blue = "#012BC4";

const colors = [white, pink, blue];
const pages = colors.length;

const Button = ({ disabled, screenState, onPress }) => {
  const valueSteps = [...Array.from({ length: pages * 2 }, (_, i) => i * 0.5)];
  const colorSteps = colors.reduce((acc, color) => {
    return [...acc, color, color];
  }, []) 
  console.log(colorSteps)
  const backgroundStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      screenState.value,
      [0, 0.5, 1, 1.5, 2],
      [white, white, pink, pink, blue, blue]
    ),
  }));
  const buttonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      screenState.value,
      [0, 0.5, 1],
      [pink, pink, white]
    ),
    transform: [
      {
        perspective: 200,
      },
      {
        rotateY: `${interpolate(
          screenState.value,
          [0, 0.5, 1],
          [0, -90, -180]
        )}deg`,
      },
      {
        scale: interpolate(screenState.value, [0, 0.5, 1], [1, 6, 1]),
      },
      // {
      //   translateX: '20%',
      // }
    ],
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.background,
        backgroundStyles,
      ]}
    >
      <Animated.View style={[styles.button, buttonStyles]}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          disabled={disabled}
          onPress={onPress}
        >
          <Text>xd</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const Liquid = () => {
  const [index, setIndex] = useState(0);
  const screenState = useSharedValue(0);
  // 0 - white
  // 1 - blue
  // 2 - pink

  const increaseIndex = () =>
    index < pages - 1 ? setIndex(index + 1) : setIndex(0);

  const onPress = () => {
    // screenState.value = Number(!Boolean(screenState.value));
    const toValue = screenState.value === 0 ? 1 : 0;
    screenState.value = withTiming(
      toValue,
      {
        duration: 1000,
      },
      (finished) => {
        if (finished) {
          runOnJS(increaseIndex)();
        }
      }
    );
  };

  return (
    <View style={styles.screen}>
      <Button
        onPress={onPress}
        screenState={screenState}
        disabled={index === 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 100,
    padding: 8,
    paddingBottom: 50,
  },
  button: {
    alignItems: "center",
    backgroundColor: "pink",
    borderRadius: 75 / 2,
    justifyContent: "center",
    width: 75,
    height: 75,
  },
});

export default Liquid;
