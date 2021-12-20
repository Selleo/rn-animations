import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
  },
  logoWrapper: {
    flex: 1,
  },
  rightSide: {
    justifyContent: "center",
    flex: 1,
    height: "100%",
    borderBottomLeftRadius: 20,
  },
  rightSideText: {
    marginLeft: 20,
  },
});

export default styles;
