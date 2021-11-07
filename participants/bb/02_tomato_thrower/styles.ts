import {Dimensions, StyleSheet} from 'react-native'
const { width } = Dimensions.get("window");

export const MAX_SIZE = width * 0.9;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 50,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  container: {
    position: "absolute",
    bottom: 100,
  },
  sliderX: {
    position: "absolute", right: 30, bottom: 130 
  },
  sliderY: {
    position: "absolute", left: 130, bottom: -45 
  },
  tomatoBackground: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "red",
    position: "absolute",
    bottom: 160,
  }
})

export default styles
