import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const ITEMS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  title: `List Item ${i}`,
  subtitle: "Lorem ipsum dolor sit amet",
}));

const MIN_HEADER_HEIGHT = 100;
const MAX_HEADER_HEIGHT = 250;

const COLLAPSE_MAX_DIFF = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;
const NO_EFFECT_SCROLL = DEVICE_HEIGHT / 4;

const CollapsibleHeader = () => {
  const startScrollY = useSharedValue(0);
  const animatedHeaderHeight = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      startScrollY.value = event.contentOffset.y;
      isScrolling.value = true;
    },
    onScroll: (event) => {
      const collapseByValue =
        event.contentOffset.y - startScrollY.value - NO_EFFECT_SCROLL;
      const isCollapsable =
        collapseByValue > 0 &&
        collapseByValue < COLLAPSE_MAX_DIFF &&
        event.contentOffset.y > startScrollY.value &&
        animatedHeaderHeight.value !== 1 &&
        isScrolling.value;

      if (isCollapsable) {
        animatedHeaderHeight.value = collapseByValue / COLLAPSE_MAX_DIFF;
      }
    },
    onEndDrag: (event) => {
      isScrolling.value = false;

      if (animatedHeaderHeight.value !== 0) {
        animatedHeaderHeight.value = 1;
      }

      if (event.contentOffset.y === 0) {
        animatedHeaderHeight.value = 0;
      }
    },
  });

  const onTap = useAnimatedGestureHandler({
    onEnd: () => {
      animatedHeaderHeight.value = 0;
    },
  });

  const mix = (value, x, y) => {
    "worklet";
    return x * (1 - value) + y * value;
  };

  const animatedContainerHeight = useAnimatedStyle(() => {
    return {
      height:
        animatedHeaderHeight.value === 0 || animatedHeaderHeight.value === 1
          ? withSpring(mix(animatedHeaderHeight.value, 250, 100))
          : withTiming(mix(animatedHeaderHeight.value, 250, 100), {
              duration: 50,
            }),
    };
  });

  const animatedButton = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedHeaderHeight.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const renderItem = ({ item }: any) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <>
      <Animated.FlatList
        bounces={false}
        data={ITEMS}
        keyExtractor={(item: any) => item.id}
        onScroll={onScroll}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <Animated.View
            style={[styles.headerContainer, animatedContainerHeight]}
          >
            <View style={styles.headerContent}>
              <View style={styles.avatar}></View>
              <Text style={styles.headerText}>HEADER</Text>
            </View>
            <TapGestureHandler onGestureEvent={onTap}>
              <Animated.View style={[animatedButton]}>
                <AntDesign name="downcircleo" size={24} color="white" />
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        }
      />
    </>
  );
};

export default CollapsibleHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 2,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#56728f",
  },
  headerContainer: {
    alignItems: "flex-end",
    backgroundColor: "#56828f",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  avatar: {
    backgroundColor: "#97b0b8",
    borderRadius: 20,
    height: 40,
    marginRight: 10,
    width: 40,
  },
});
