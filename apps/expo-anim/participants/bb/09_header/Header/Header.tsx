import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const ICON_CONTAINER_WIDTH = 48;

const { width } = Dimensions.get("window");

type HeaderProps = {};

const Header = ({
  translationY,
  title = "Don't See Your City?",
  leftIconName = "left",
  onLeftIconPress = () => {},
  animatedTitle = true,
}) => {
  const [titleSize, setTitleSize] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  console.log({
    width,
    w: titleSize.width,
  });

  const titleStyles = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        translationY.value,
        [0, 64],
        [24, 16],
        Extrapolate.CLAMP
      ),
      left: interpolate(
        translationY.value,
        [0, 64],
        [24, (width - titleSize.width - ICON_CONTAINER_WIDTH + 24) / 2],
        Extrapolate.CLAMP
      ),
      top: interpolate(
        translationY.value,
        [0, 64],
        [0, -40],
        Extrapolate.CLAMP
      ),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [0, 64],
        [120, 64],
        Extrapolate.CLAMP
      ),
      borderBottomWidth: interpolate(
        translationY.value,
        [0, 20, 64],
        [0, 0, 1],
        Extrapolate.CLAMP
      ),
      borderBottomColor: "aliceblue",
    };
  });

  return (
    <Animated.View style={[styles.container, animatedTitle && containerStyle]}>
      <View style={styles.content}>
        <Pressable style={styles.iconContainer} onPress={onLeftIconPress}>
          <AntDesign name={leftIconName} size={24} color="black" />
        </Pressable>
        <Text
          style={[animatedTitle && styles.hiddenTitle]}
          onLayout={(event) => {
            setTitleSize(event.nativeEvent.layout);
          }}
        >
          {title}
        </Text>
        <View style={styles.iconContainer} />
      </View>
      {animatedTitle ? (
        <Animated.Text style={[titleStyles]}>{title}</Animated.Text>
      ) : null}
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1000,
  },
  content: {
    height: 64,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  hiddenTitle: {
    opacity: 0,
  },
  iconContainer: {
    width: ICON_CONTAINER_WIDTH,
    height: ICON_CONTAINER_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});
