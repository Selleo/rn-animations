import { StyleSheet } from "react-native";

import { BALL_HEIGHT } from "../styles";

const styles = StyleSheet.create({
  stone: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "red",
    height: BALL_HEIGHT,
    width: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT,
  },
  resetButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    width: BALL_HEIGHT,
    height: BALL_HEIGHT,
    borderRadius: BALL_HEIGHT,
  },
});

export default styles;
