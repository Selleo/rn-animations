import React, { FC, useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Dimensions, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  baloon: {
    backgroundColor: "green",
    width: 40,
    height: 40,
    borderRadius: 40,
    alignSelf: "center",
  },
});

const Baloon: FC = () => {
  const size = useSharedValue(40);
  const [showWarning, setShowWarning] = useState<boolean>();
  const [inflateInterval, setInflateInterval] = useState<NodeJS.Timer>();
  const [deflateInterval, setDeflateInterval] = useState<NodeJS.Timer>();
  const maxWidth = Dimensions.get("window").width * 0.9;

  const inflate = () => {
    setInflateInterval(
      setInterval(() => {
        if (size.value < maxWidth) {
          size.value = size.value + 10;
        } else {
          setShowWarning(true);
          inflateInterval && clearInterval(inflateInterval);
        }
      }, 100)
    );
    if (deflateInterval) {
      clearInterval(deflateInterval);
    }
  };

  const deflate = () => {
    setDeflateInterval(
      setInterval(() => {
        if (size.value > 40) {
          size.value = size.value - 10;
          setShowWarning(false);
        } else {
          deflateInterval && clearInterval(deflateInterval);
        }
      }, 100)
    );

    if (inflateInterval) {
      clearInterval(inflateInterval);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(size.value, { duration: 100 }),
      height: withTiming(size.value, { duration: 100 }),
      borderRadius: withTiming(size.value, { duration: 100 }),
      backgroundColor: size.value >= maxWidth ? "red" : "green",
    };
  });

  return (
    <View style={styles.view}>
      {showWarning && (
        <Text style={styles.text}>Stop it! I'll explode in a moment</Text>
      )}
      <Pressable onPressIn={inflate} onPressOut={deflate}>
        <Animated.View style={[styles.baloon, animatedStyles]} />
      </Pressable>
    </View>
  );
};

export default Baloon;
