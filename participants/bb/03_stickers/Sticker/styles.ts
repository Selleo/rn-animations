import { Dimensions, StyleSheet } from "react-native";

export const STICKER_HEIGHT = 60;

const styles = StyleSheet.create({
  image: {
    height: STICKER_HEIGHT,
    width: STICKER_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowRadius: 3.0,
  },
  stickerContainer: {
    borderColor: "gray",
    borderRightWidth: 1,
    height: STICKER_HEIGHT,
    width: STICKER_HEIGHT,
  },
});

export default styles;
