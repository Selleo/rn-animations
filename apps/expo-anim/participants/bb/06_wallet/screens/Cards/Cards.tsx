import React, { useMemo } from "react";
import {
  FlatList,
  View,
  Pressable,
  Text,
  Image,
  ListRenderItem,
  ScrollView,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { RootStackParamList } from "../../App";
import { CARDS } from "../../consts";

import Card from "./Card";
import NewButton from "./NewButton";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Cards">;

const Cards: React.FC<Props> = () => {
  const transformAnimation = useSharedValue(0);
  const showNewButton = useSharedValue(0);
  const lastZIndex = useSharedValue(0);

  useFocusEffect(() => {
    transformAnimation.value = withDelay(300, withTiming(0));
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    showNewButton.value = withTiming(event.contentOffset.y > 0 ? 0.5 : 0);
    transformAnimation.value = withTiming(event.contentOffset.y > 0 ? 0.5 : 0);
  });

  const renderCards = useMemo(() => {
    return CARDS.map((item, index) => {
      return (
        <Card
          key={item.id}
          card={item}
          index={index}
          transformAnimation={transformAnimation}
          lastZIndex={lastZIndex}
        />
      );
    });
  }, [CARDS]);

  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        // onScroll={scrollHandler} // uncomment this and interpolate in card to change mode
        style={styles.container}
      >
        {renderCards}
      </Animated.ScrollView>
      <NewButton showNewButton={showNewButton} />
    </>
  );
};

export default Cards;

// with flatlist

// import React from "react";
// import {
//   FlatList,
//   View,
//   Pressable,
//   Text,
//   Image,
//   ListRenderItem,
// } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withTiming,
// } from "react-native-reanimated";
// import { SharedElement } from "react-navigation-shared-element";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { useFonts } from "expo-font";

// import { RootStackParamList } from "../../App";
// import { CARDS, CardDTO } from "../../consts";

// import styles from "./styles";

// type Props = NativeStackScreenProps<RootStackParamList, "Cards">;

// import Card from "./Card";
// import { useFocusEffect } from "@react-navigation/native";

// const Cards: React.FC<Props> = () => {
//   const transformAnimation = useSharedValue(0);

//   useFocusEffect(() => {
//     transformAnimation.value = withDelay(1000, withTiming(0));
//   });

//   const renderCard: ListRenderItem<CardDTO> = ({ item, index }) => {
//     return (
//       <Card card={item} index={index} transformAnimation={transformAnimation} />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList<CardDTO> data={CARDS} renderItem={renderCard} />
//     </View>
//   );
// };

// export default Cards;
