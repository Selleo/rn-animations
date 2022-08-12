import {StyleSheet} from 'react-native'

export const HANDLER_SIZE = 20;
export const PULL_HEIGHT = 200;

const styles = StyleSheet.create({
  handler: {
    width: HANDLER_SIZE,
    height: HANDLER_SIZE,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  pullContainer: {
    borderRadius: 50,
    position: "absolute",
    height: PULL_HEIGHT,
    backgroundColor: "black",
    width: 10,
    alignItems: "center",
  },
});

export default styles
