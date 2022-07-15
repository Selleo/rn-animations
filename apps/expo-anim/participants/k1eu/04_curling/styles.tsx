import { StyleSheet } from "react-native";

export const WALL_WIDTH_SCALE = 0.8;
export const WALL_HEIGHT_SCALE = 0.8;
export const TOMATO_WIDTH = 50;
export const TOMATO_HEIGHT = 50;

export default  StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position: "relative",
  },
  ball: {
    position: "absolute",
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  tomato: {
    width: TOMATO_WIDTH,
    height: TOMATO_HEIGHT,
    position: "absolute",
  },
});
