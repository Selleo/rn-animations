import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 250;

const data = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  title: `Item ${i}`,
}));

const CollapseHeader = () => {
  const scrollY = useSharedValue(0);
  const { height } = useWindowDimensions();
  const halfScreenHeight = height / 3;
  const minHeaderScrollOffset = halfScreenHeight + 150;

  const derived = useDerivedValue(() => {
    console.log(scrollY.value);
  }, [scrollY.value]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyles = useAnimatedStyle(() => {
    return {
      height:
        scrollY.value < halfScreenHeight
          ? HEADER_MAX_HEIGHT
          : scrollY.value > minHeaderScrollOffset
          ? HEADER_MIN_HEIGHT
          : interpolate(
              scrollY.value,
              [halfScreenHeight, minHeaderScrollOffset],
              [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT]
            ),
    };
  });

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={[
          {
            paddingVertical: 16,
            backgroundColor: "lightblue",
            marginBottom: 16,
          },
        ]}
      >
        <Text>{item.title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        position: "relative",
      }}
    >
      <Animated.View
        style={[
          {
            alignItems: "center",
            backgroundColor: "blue",
            justifyContent: "center",
            // position:'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            // zIndex: 100,
          },
          headerStyles,
        ]}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          CollapseHeader
        </Text>
      </Animated.View>
      <Animated.FlatList
        //@ts-ignore
        data={data}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

export default CollapseHeader;

const styles = StyleSheet.create({});
