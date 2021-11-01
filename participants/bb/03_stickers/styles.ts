import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
const LIST_HEIGHT = 100;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  listContainer: {
    position: "absolute",
    bottom: LIST_HEIGHT,
    flexDirection: "row",
    height: LIST_HEIGHT,
  },
});

export default styles;
