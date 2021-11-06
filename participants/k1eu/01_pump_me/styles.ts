import { StyleSheet } from "react-native";

export const DIAMETER = 80;
export const COLOR_DEFAULT = "blue";
export const COLOR_WARNING = "red";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
  },
  baloon: {
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: 50,
  },
  dangerText: {
    color: "white",
  },
});

export default styles;
