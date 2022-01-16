import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  description: {
    color: "gray",
    fontSize: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  row: {
    paddingLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default styles;
