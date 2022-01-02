import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  Easing,
  withTiming,
  FadeIn,
  SlideOutDown,
} from "react-native-reanimated";

import MyCard from "./components/MyCard";
import Button from "./components/Button";
import { CARDS_OVERLAY, CARD_HEIGHT, MARGIN } from "./components/constants";
import Transactions from "./components/Transactions";

const Waleet = () => {
  const [cards, setCards] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
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
    view === "expand" && (setView("detail"), setCurrentCard(id));
    view === "detail" && setView("expand");
  };
  const onDoubleCardClick = () => {
    if (view === "expand") {
      setView("hide");
      setCurrentCard(null);
    }
  };

  const animatedContainerHeight = useAnimatedStyle(() => {
    const height = mix(
      transition.value,
      view === "hide" || previousState.current === "hide"
        ? cards.length - 1 * CARDS_OVERLAY + CARD_HEIGHT
        : CARD_HEIGHT,
      cards.length * (CARD_HEIGHT + MARGIN)
    );
    return {
      height,
    };
  });
  const animatedHeaderHeight = useAnimatedStyle(() => {
    const height = mix(
      transition.value,
      view === "hide" || previousState.current === "hide" ? 40 : 0,
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
        view === "hide" || previousState.current === "hide"
          ? index * CARDS_OVERLAY
          : 0,
        index * (CARD_HEIGHT + MARGIN)
      );
      return {
        transform: [{ translateY }],
        zIndex: cardId === currentCard ? 10 : 1,
      };
    });
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
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
        <Animated.View
          style={[{ marginLeft: MARGIN }, animatedContainerHeight]}
        >
          {cards.map((card, index) => {
            return (
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
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
        {view === "detail" && <Transactions />}
      </ScrollView>

      {view === "hide" && (
        <Button
          onPress={() => console.log("add new card")}
          delay={!previousState.current ? 1200 + cards.length * 200 : 800}
        />
      )}
    </View>
  );
};

export default Waleet;
