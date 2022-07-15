import { StyleSheet } from "react-native";

export const POINT_SIZE = 200;
export const BALL_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    flex: 1,
    justifyContent: "center",
  },
  line: {
    backgroundColor: "red",
    bottom: 200,
    height: 4,
    position: "absolute",
    width: "100%",
  },
  point: {
    height: POINT_SIZE,
    position: "absolute",
    top: 0,
    width: POINT_SIZE,
  },
});

export default styles;
