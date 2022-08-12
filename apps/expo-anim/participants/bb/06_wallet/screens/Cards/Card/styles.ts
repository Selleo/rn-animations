import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    zIndex: 1,
    borderRadius: 20,
  },
  imageContainer: {
    overflow: "hidden",
    marginBottom: 20,
    width: "100%",
  },
  number: {
    color: "gold",
  },
  numberContainer: {
    padding: 10,
    position: "absolute",
    bottom: 40,
    color: "white",
  },
  ownerName: {
    color: "white",
    fontFamily: "RobotoMedium",
  },
  ownerNameContainer: {
    padding: 10,
    position: "absolute",
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
  },
});

export default styles;
