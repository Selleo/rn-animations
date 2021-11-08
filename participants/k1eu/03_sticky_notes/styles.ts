import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    minHeight: "100%",
    position: "relative",
  },
  noteDispenser: {
    flexDirection: "row",
  },
  floatingButton: {
    alignItems: "center",
    backgroundColor: "#4AA8F0",
    borderRadius: 50,
    bottom: 20,
    color: "white",
    height: 75,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    width: 75,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
