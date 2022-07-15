import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

const SingleItem = ({
  index,
  iterator,
  numberOfItems,
  opened,
  radius,
  where,
  hide,
}) => {
  const navigation = useNavigation();
  const styles = useAnimatedStyle(() => {
    const center = opened.value ? 140 : -100;
    const left =
      center +
      radius.value *
        Math.cos((2 * Math.PI * index) / numberOfItems + iterator.value / 100);
    const topa =
      center +
      radius.value *
        Math.sin((2 * Math.PI * index) / numberOfItems + iterator.value / 100);

    return {
      top: topa,
      left: left,
      zIndex: 1001,
      position: "absolute",
      backgroundColor: "orange",
      width: opened.value ? 20 : 0,
      height: opened.value ? 20 : 0,
      borderRadius: opened.value ? 10 : 0,
      transform: [
        {
          translateX: interpolate(opened.value, [0, 1], [-150, 0]),
        },
        {
          translateY: interpolate(opened.value, [0, 1], [-150, 0]),
        },
      ],
    };
  });

  return (
    <Animated.View style={styles}>
      <TouchableOpacity onPress={() => hide(() => navigation.navigate(where))}>
        <Text
          style={{ zIndex: 2000, position: "absolute", width: 90, left: 30 }}
        >
          🐑 {where}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SingleItem;
