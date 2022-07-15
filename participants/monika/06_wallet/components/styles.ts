import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 20,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderColor: "#56728f",
    borderWidth: 1,
    borderRadius: 8,
  },
  body: { flex: 1, marginRight: 20, marginLeft: 10 },
  shop: { fontWeight: "600", fontSize: 14 },
  category: { color: "#56728f" },
  transactionDetails: { flexBasis: 100 },
  price: { fontSize: 16, fontWeight: "700", textAlign: "right" },
  date: { textAlign: "right", color: "#56728f" },
  transaction: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
});
export default styles;
