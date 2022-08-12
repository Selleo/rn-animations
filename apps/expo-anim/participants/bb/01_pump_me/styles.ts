import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const MAX_SIZE = width * 0.9;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: MAX_SIZE,
    justifyContent: "center",
  },
});

export default styles;
