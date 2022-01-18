import { useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import store, { type TCard } from "../../store";

import Card from "../Card";
import { StackParams } from "../Navigator/Navigator";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";

type NavigationProps = StackScreenProps<StackParams, "Details">["navigation"];

const List = () => {
  // const isListOpen = useState(false);
  const isListOpen = useSharedValue(true);
  const isBeingDragged = useSharedValue(false);
  const navigation = useNavigation<NavigationProps>();

  const handlePress = (id: string) => {
    if (isListOpen.value === true) {
      navigation.navigate("Details", { id });
      // isListOpen.value = false;
    } else {
      isListOpen.value = true;
    }
  }

    const isScrolling = useSharedValue(false);
    const translationY = useSharedValue(0);
    const lastContentOffset = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
      // onScroll: (event) => {
        // if (lastContentOffset.value > event.contentOffset.y) {
        //   if (isScrolling.value) {
        //     console.log("UP");
        //   }
        // } else if (lastContentOffset.value < event.contentOffset.y) {
        //   if (isScrolling.value) {
        //     console.log("DOWN");
        //   }
        // }
        // lastContentOffset.value = event.contentOffset.y;
      // },
      onBeginDrag: (e) => {
        isScrolling.value = true;
      },
      onEndDrag: (e) => {
        isScrolling.value = false;
      },
    });

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
      <FlatList data={store} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
});

export default List;
