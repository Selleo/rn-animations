import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    padding: 8,
    position: "absolute",
    width: 100,
  },
  container: {
    position: 'relative'
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  closeText : {
    color: "red",
    fontSize: 24,
  },
  input: {
    textAlign: "center",
  }
});
