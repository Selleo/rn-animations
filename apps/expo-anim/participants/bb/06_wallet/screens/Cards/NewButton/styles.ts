import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const SIZE = 90;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0077fe",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: width / 2 - SIZE / 2,
  },
  icon: {},
});

export default styles;
