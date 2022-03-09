import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Animated, {
  FadeInUp,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import store, { type TCard } from "../../store";

import Card from "../Card";
import { StackParams } from "../Navigator/Navigator";

type NavigationProps = StackScreenProps<StackParams, "Details">["navigation"];

const { width } = Dimensions.get("screen");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const List = () => {
  const isListOpen = useSharedValue(true);
  const shouldAnimate = useSharedValue(false);
  const navigation = useNavigation<NavigationProps>();

  const handlePress = (id: string) => {
    if (isListOpen.value === true) {
      shouldAnimate.value = true;
      navigation.navigate("Details", { id });
    } else {
      isListOpen.value = true;
    }
  };

  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y) {
        if (isScrolling.value) {
          console.log("UP");
          isListOpen.value = false;
        }
      } else if (lastContentOffset.value < event.contentOffset.y) {
        if (isScrolling.value) {
          console.log("DOWN");
          isListOpen.value = true;
        }
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const animatedButtonStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isListOpen.value ? 0 : 1),
    transform: [
      {
        translateY: withTiming(isListOpen.value ? 200 : 0),
      }
    ]
  }));

  const renderItem = ({ item, index }: { item: TCard; index: number }) => (
    <SharedElement id={`${item.id}.card`}>
      <Card
        data={item}
        index={index}
        isListOpen={isListOpen}
        onPress={handlePress}
      />
    </SharedElement>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        //@ts-ignore
        onScroll={scrollHandler}
        data={store}
        renderItem={renderItem}
      />
      <AnimatedPressable
        style={[styles.addButton, animatedButtonStyles]}
        entering={FadeInUp}
      >
        <Text style={{ color: "white", fontSize: 30 }}>+</Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    position: "relative",
  },
  addButton: {
    alignItems: "center",
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: width / 2 - 40,
    backgroundColor: "blue",
    opacity: 0,
  },
});

export default List;
