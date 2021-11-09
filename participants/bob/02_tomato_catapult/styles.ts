import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  touchable: {
    zIndex: 3,
    width: width,
    height: 300,
    marginTop: 600,
  },
  wall: {
    width: "80%",
    height: "80%",
    position: "absolute",
    backgroundColor: "gray",
  },
});
