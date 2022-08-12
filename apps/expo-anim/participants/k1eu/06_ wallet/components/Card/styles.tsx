import { StyleSheet, Dimensions } from "react-native";

// real credit card dimmensions
// width 85.60mm
// height 53.98mm
// x = 0.630607

const { width } = Dimensions.get('screen');

const cardWidth = width * 0.85;
export const cardHeight = cardWidth * 0.630607;

export default StyleSheet.create({
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: cardWidth,
    height: cardHeight,
  },
  cardWrapper: {
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: cardHeight,
    // marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    width: cardWidth,
  },
  cardDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  cardNumber: {
    color: 'black',
    fontSize: 20,
  },
  cardOwner: {
    color: 'black',
    fontSize: 20,
  }
})
