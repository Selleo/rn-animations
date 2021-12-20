import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const CONTAINER_PADDING = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  detailContainer: {
    padding: CONTAINER_PADDING,
  },
  description: { fontSize: 16, fontFamily: "RobotoRegular" },
  headerContainer: {
    height: 80,
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100000,
  },
  name: { fontSize: 40, fontFamily: "RobotoBold" },
  image: {
    width: width,
    height: 300,
  },
  imageContainer: {},
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
});

export default styles;
