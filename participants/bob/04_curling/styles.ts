import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const middle = width / 2 - 40;
export const stoneStartingPosition = height - height * 0.2;
export const throwLine = height - height * 0.3;
export const targetMiddle = height * 0.1;

console.log({ targetMiddle });

export default StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  target: {
    backgroundColor: "gray",
    borderRadius: 40,

    width: 80,
    height: 80,
    position: "absolute",
    top: targetMiddle,
    left: width / 2 - 40,
  },
  trowingLine: {
    width: "100%",
    top: throwLine,
    height: 2,
    backgroundColor: "gray",
    position: "absolute",
  },
  stone: {
    backgroundColor: "red",
    borderRadius: 30,
    width: 60,
    height: 60,
    position: "absolute",
  },
});
