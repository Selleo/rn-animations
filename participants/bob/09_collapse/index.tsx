import * as React from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { times } from "lodash";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("screen");

export default function App() {
  const flatListData = React.useMemo(() => {
    const data: { id: number }[] = [];

    times(50, (index) => data.push({ id: index }));
    return data;
  }, []);

  const translationY = useSharedValue(0);
  const setOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y + setOffset.value;
  });

  const styleHeaders = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translationY.value,
        [-20, 0, height / 2, height / 2 + 200, height / 2 + 400],
        [250, 250, 250, 50, 50]
      ),
      backgroundColor: "yellow",
    };
  });

  const button = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translationY.value,
        [-20, 0, height / 2, height / 2 + 200, height / 2 + 400],
        [0, 0, 0, 1, 1]
      ),
      height: 40,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
    };
  });

  const renderItem = useCallback((item) => {
    return (
      <View style={styles.item}>
        <Text>{item.id}</Text>
      </View>
    );
  }, []);

  const bounceBack = () => {
    setOffset.value = withSpring(-translationY.value);
    translationY.value = withSpring(0);
  };

  return (
    <SafeAreaView>
      <Animated.FlatList
        ListHeaderComponent={
          <Animated.View style={styleHeaders}>
            <Animated.View style={button}>
              <TouchableOpacity onPress={bounceBack}>
                <Text>Click me</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        }
        renderItem={renderItem}
        data={flatListData}
        onScroll={scrollHandler}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "pink",
    height: 100,
    marginBottom: 10,
  },
});
