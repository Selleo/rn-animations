import { StyleSheet } from "react-native";

export const WALL_WIDTH_SCALE = 0.8;
export const WALL_HEIGHT_SCALE = 0.8;
export const TOMATO_WIDTH = 50;
export const TOMATO_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  svgContainer: {
    zIndex: 200,
  },
  tomato: {
    width: TOMATO_WIDTH,
    height: TOMATO_HEIGHT,
    position: "absolute",
  },
  wall: {
    backgroundColor: "gray",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

export default styles;
