import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    borderRadius: 20,
  },
  imageContainer: {
    overflow: "hidden",
    width: "80%",
    height: "80%",
    zIndex: 1000000,
  },
  nameContainer: {
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
  },
  name: {
    fontFamily: "RobotoMedium",
  },
  propertyContainer: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  rateContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default styles;
