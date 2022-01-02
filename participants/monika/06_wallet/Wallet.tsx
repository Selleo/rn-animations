import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  Easing,
  withTiming,
  FadeIn,
  SlideOutDown,
} from "react-native-reanimated";

import { transactions } from "./components/transactionList";
import MyCard from "./components/MyCard";
import Button from "./components/Button";

const Waleet = () => {
  const [cards, setCards] = useState([
    { id: 1, color: "red" },
    { id: 2, color: "green" },
    { id: 3, color: "blue" },
    { id: 4, color: "purple" },
  ]);
  const [view, setView] = useState("hide");
  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const previousState = useRef<null | string>(null);

  const isHide = useSharedValue(0);

  useEffect(() => {
    isHide.value = view === "hide" || view === "detail" ? 0 : 1;
  }, [view]);

  const transition = useDerivedValue(() => {
    return withTiming(isHide.value, {
      duration: 500,
      easing: Easing.bezier(0.36, 0, 0.66, 0),
    });
  });

  const mix = (value: number, x: number, y: number) => {
    "worklet";
    return x * (1 - value) + y * value;
  };
  const onCardClick = (id: number) => {
    previousState.current = view;
    view === "hide" && setView("expand");
    view === "expand" && setView("detail");
    view === "expand" && setCurrentCard(id);
    view === "detail" && setView("expand");
  };
  const onDoubleCardClick = () => {
    view === "expand" && setView("hide");
    view === "expand" && setCurrentCard(null);
  };

  const animatedContainerHeight = useAnimatedStyle(() => {
    const height = mix(
      transition.value,
      view === "hide" || previousState.current === "hide"
        ? cards.length * 30 + 200
        : 200,
      cards.length * 220
    );
    return {
      height,
    };
  });
  const animatedHeaderHeight = useAnimatedStyle(() => {
    const height = mix(
      transition.value,
      view === "hide" || previousState.current === "hide" ? 30 : 0,
      0
    );
    return {
      height,
    };
  });

  const cardAnimation = (index: number, cardId: number) => {
    return useAnimatedStyle(() => {
      const translateY = mix(
        transition.value,
        view === "hide" || previousState.current === "hide" ? index * 30 : 0,
        index * 220
      );
      return {
        transform: [{ translateY }],
        zIndex: cardId === currentCard ? 10 : 1,
      };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={FadeIn.delay(500)}
        exiting={SlideOutDown}
        style={[{ justifyContent: "center" }, animatedHeaderHeight]}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", textAlign: "center" }}>
          Wallet
        </Text>
      </Animated.View>
      <ScrollView>
        <Animated.View style={animatedContainerHeight}>
          {cards.map((card, index) => {
            return (
              <Animated.View
                style={[
                  { position: "absolute", top: 0, left: 0 },
                  cardAnimation(index, card.id),
                ]}
                key={index}
              >
                <MyCard
                  card={card}
                  onClick={onCardClick}
                  onDoubleClick={onDoubleCardClick}
                />
              </Animated.View>
            );
          })}
        </Animated.View>

        {view === "detail" &&
          transactions.map((item, index) => (
            <Animated.View entering={FadeIn.delay(700 + index * 200)}>
              <Text key={item.id}>{item.shop}</Text>
            </Animated.View>
          ))}
      </ScrollView>

      {view === "hide" && (
        <Button
          onPress={() => console.log("add new card")}
          delay={!previousState.current ? 1200 + cards.length * 200 : 500}
        />
      )}
    </View>
  );
};

export default Waleet;
