import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const CONTAINER_PADDING = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  detailContainer: {
    padding: CONTAINER_PADDING,
  },
  description: { fontSize: 16, fontFamily: "RobotoRegular" },
  name: { fontSize: 40, fontFamily: "RobotoBold" },
  image: {
    width: "100%",
    height: 240,
    zIndex: 1,
    borderRadius: 20,
  },

  text: {
    position: "absolute",
    top: 0,
    zIndex: 1000,
    left: 0,
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
