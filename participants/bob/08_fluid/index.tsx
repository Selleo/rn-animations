import * as React from "react";
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { get, cloneDeep } from "lodash";
import { SharedElementAnimatedValue } from "react-navigation-shared-element";
const colors = [
  {
    initialBgColor: "#32A89C",
    bgColor: "#000",
    nextBgColor: "#7643A8",
  },
  {
    initialBgColor: "#7643A8",
    bgColor: "#7643A8",
    nextBgColor: "#FFFFFF",
  },
  {
    initialBgColor: "#221211",
    bgColor: "#FFFFFF",
    nextBgColor: "#32A89C",
  },
];

const { width } = Dimensions.get("window");

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const screens = [
  {
    title: "Welcome in team fingerprints",
  },
  {
    title: "You can check your trends",
  },
  {
    title: "And compare them with others",
  },
];

type Screen = { [key: string]: string };

interface IPropsCircle {
  onPress: () => void;
  index: SharedElementAnimatedValue;
  animatedValue: SharedElementAnimatedValue;
  animatedValue2: SharedElementAnimatedValue;
  screens: Screen[];
  colors: SharedElementAnimatedValue;
}

const Circle: React.FC<IPropsCircle> = ({
  onPress,
  index,
  animatedValue,
  animatedValue2,
  colors,
}) => {
  const colorsSV: any = useDerivedValue(() => {
    return colors.value[index.value];
  });
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const constainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(animatedValue2.value, inputRange, [
      colorsSV.initialBgColor,
      colorsSV.initialBgColor,
      colorsSV.initialBgColor,
      colorsSV.bgColor,
      colorsSV.bgColor,
    ]);
    return { backgroundColor };
  });

  const circleStyle = useAnimatedStyle(() => {
    const dotBgColor = interpolateColor(
      animatedValue2.value,
      [0, 0.001, 0.5, 0.501, 0.9, 1],
      [
        colorsSV.bgColor,
        colorsSV.bgColor,
        colorsSV.bgColor,
        colorsSV.initialBgColor,
        colorsSV.initialBgColor,
        colorsSV.nextBgColor,
      ]
    );
    return {
      backgroundColor: dotBgColor,
      transform: [
        { perspective: 200 },
        {
          rotateY: `${interpolate(
            animatedValue2.value,
            [0, 0.5, 1],
            [0, -90, -180]
          )}deg`,
        },

        {
          scale: interpolate(animatedValue2.value, [0, 0.5, 1], [1, 6, 1]),
        },

        {
          translateX: `${interpolate(
            animatedValue2.value,
            [0, 0.5, 1],
            [0, 50, 0]
          )}%`,
        },
      ],
    };
  });

  const buttonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animatedValue.value,
            [0, 0.05, 0.5, 1],
            [1, 0, 0, 1]
          ),
        },
        {
          rotateY: `${interpolate(
            animatedValue.value,
            [0, 0.5, 0.9, 1],
            [0, 180, 180, 180]
          )}deg`,
        },
      ],
      opacity: interpolate(
        animatedValue.value,
        [0, 0.05, 0.9, 1],
        [1, 0, 0, 1]
      ),
    };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, styles.container, constainerStyle]}
    >
      <Animated.View style={[styles.circle, circleStyle]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={[styles.button, buttonStyles]}>
            <AnimatedAntDesign name="arrowright" size={28} color={"white"} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const colorsSH = useSharedValue(colors);
  const animatedValue = useSharedValue<number>(0);
  const animatedValue2 = useSharedValue<number>(0);
  const sliderAnimatedValue = useSharedValue<number>(0);
  const inputRange = [...Array(screens.length).keys()];
  const index = useSharedValue(0);

  const animate = (i: number) => {
    sliderAnimatedValue.value = withTiming(i, { duration: TEXT_DURATION });
    animatedValue.value = withTiming(1, { duration: DURATION });
    animatedValue2.value = withTiming(1, { duration: DURATION });
  };

  const onPress = () => {
    animatedValue.value = 0;
    animatedValue2.value = 0;

    animate((index.value + 1) % colors.length);
    index.value = (index.value + 1) % colors.length;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            sliderAnimatedValue.value,
            inputRange,
            screens.map((_, i) => -i * width * 2)
          ),
        },
      ],
      opacity: interpolate(
        sliderAnimatedValue.value,
        [...Array(screens.length * 2 + 1).keys()].map((i) => i / 2),
        [...Array(screens.length * 2 + 1).keys()].map((i) =>
          i % 2 === 0 ? 1 : 0
        )
      ),
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 100 }}>
      <StatusBar hidden />
      <Circle
        index={index}
        onPress={onPress}
        screens={screens}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
        colors={colorsSH}
      />
      <Animated.View
        style={[
          {
            flexDirection: "row",
          },
          animatedStyles,
        ]}
      >
        {screens.slice(0, colors.length).map(({ title }, i) => {
          return (
            <View style={{ paddingRight: width, width: width * 2 }} key={i}>
              <Text
                style={[styles.paragraph, { color: colors[i].nextBgColor }]}
              >
                {title}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
