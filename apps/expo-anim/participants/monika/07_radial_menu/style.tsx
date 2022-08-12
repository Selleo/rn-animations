import { StyleSheet } from "react-native";
import { R, r, c, segment } from "./constants";

export const styles = StyleSheet.create({
  item_container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  item: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff8189",
    width: r,
    height: r,
    borderRadius: r / 2,
  },
  label: {
    width: 200,
    paddingLeft: 10,
  },
  circle: {
    borderWidth: 2,
    borderColor: "#ff8189",
    borderRadius: R / 2,
    width: R,
    height: R,
  },
  innerCircle: {
    width: R / 2,
    height: R / 2,
    position: "absolute",
    backgroundColor: "#ff8189",
    left: R / 4,
    borderRadius: R / 4,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    left: -240,
  },
});
