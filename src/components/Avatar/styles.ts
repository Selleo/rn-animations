import { StyleSheet } from "react-native";

export const IMG_SIZE = 80;

export default StyleSheet.create({
  container: {
    borderRadius: IMG_SIZE / 2,
    backgroundColor: "white",
    margin: 2,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: IMG_SIZE / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: IMG_SIZE + 4,
    height: IMG_SIZE + 4,
  },
});
