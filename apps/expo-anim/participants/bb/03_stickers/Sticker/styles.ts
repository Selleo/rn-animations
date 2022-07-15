import { Dimensions, StyleSheet } from "react-native";

export const STICKER_HEIGHT = 60;

const styles = StyleSheet.create({
  image: {
    height: STICKER_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 3.0,
    width: STICKER_HEIGHT,
  },
  imagePlaceholder: {
    opacity: 0.2,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  placeholderIcon: {
    position: "absolute",
  },
  stickerContainer: {
    borderColor: "gray",
    borderRightWidth: 1,
    height: STICKER_HEIGHT,
    width: STICKER_HEIGHT,
  },
});

export default styles;
