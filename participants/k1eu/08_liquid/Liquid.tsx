import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  interpolate,
  interpolateColor,
  runOnJS,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomInRight,
  ZoomOutLeft,
} from "react-native-reanimated";

const pink = "#FAAFD4";
const white = "#FFFFFF";
const blue = "#012BC4";
const black = "#000000";

const {  width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: 'Drag and drop to move',
    img: require('./assets/1.png'),
    fontColor: black,
  },
  {
    id: 2,
    title: 'Local news stories',
    img: require('./assets/2.png'),
    fontColor: white,
  },
  {
    id: 3,
    title: 'Choose your interests',
    img: require('./assets/3.png'),
    fontColor: white,
  },
]

const colors = [white, pink, blue];
const pages = colors.length;

const Button = ({ disabled, index, screenState, onPress }) => {
  const backgroundStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      screenState.value,
      [0, 0.5, 0.5001, 1, 1.5, 1.5001, 2],
      [white, white, blue, blue, blue, pink, pink]
    ),
  }));
  const buttonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      screenState.value,
      [0, 0.5, 0.5001, 0.9, 1, 1.5, 1.5001, 1.9, 2],
      [blue, blue, white, white, pink, pink, blue, blue, white]
    ),
    transform: [
      {
        perspective: 200,
      },
      {
        rotateY: `${interpolate(
          screenState.value,
          [0, 0.5, 1, 1.5, 2],
          [0, -90, -180, -270, -360]
        )}deg`,
      },
      {
        scale: interpolate(
          screenState.value,
          [0, 0.5, 1, 1.5, 2],
          [1, 6, 1, 6, 1]
        ),
      },
    ],
  }));
  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      screenState.value,
      [0, 0.5, 0.5001, 2],
      [white, white, black, black]
    ),
    transform: [
      {
        rotateY: `${interpolate(
          screenState.value,
          [0, 0.5, 0,501, 1, 1.5, 1.501, 2],
          [0, 0, 0, 0, 0, 0, 0]
        )}deg`,
      },
    ],
  }));

  const renderCorrectChuj = () => {
    const item = data[index]
    return (
      <Animated.View
        entering={SlideInRight.delay(750)}
        exiting={SlideOutLeft.duration(750)}
        key={index}
        style={{
          marginBottom: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image style={{ width: width * 0.7 }} source={item.img}/>
        <Text style={{fontSize: 40, width: width * 0.8, textAlign: 'center', color: item.fontColor}}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.background,
        backgroundStyles,
      ]}
    >
      {renderCorrectChuj()}
      <Animated.View style={[styles.button, buttonStyles]}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={onPress}
        >
          <Animated.Text style={[{ fontSize: 30 },textStyles]}>{'>'}</Animated.Text>
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
    let toValue: number;
    if (screenState.value < pages - 1) {
      toValue = screenState.value + 1;
    } else {
      toValue = 0;
    }
    console.log(toValue);
    runOnJS(increaseIndex)();
    screenState.value = withTiming(toValue, {
      duration: 1500,
    });
  };

  return (
    <View style={styles.screen}>
      <Button
        onPress={onPress}
        screenState={screenState}
        disabled={index === pages - 1}
        index={index}
        // disabled={false}
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
