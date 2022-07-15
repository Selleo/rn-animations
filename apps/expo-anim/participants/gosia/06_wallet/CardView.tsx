import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect, useRef } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Card, WALLET_VIEW } from "./types";
import { TransactionsList } from "./TransactionsList";

type Props = {
  card: Card;
  index: number;
  selectCard: Function;
  selectedCard: number | undefined;
  walletState: WALLET_VIEW;
};

export const CardView: React.FC<Props> = ({
  card: { color, transactions },
  index,
  selectCard,
  selectedCard,
  walletState,
}) => {
  const doubleTapRef = useRef();
  const top = useSharedValue(0);

  useEffect(() => {
    if (walletState === WALLET_VIEW.all) {
      top.value = index * 210;
    }
    if (walletState === WALLET_VIEW.details) {
      top.value = 0;
    }
    if (walletState === WALLET_VIEW.default) {
      top.value = index * 30;
    }
  }, [walletState]);

  const onDoubleTap = (event: { nativeEvent: { state: number } }) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      selectCard();
    }
  };

  const cardStyle = useAnimatedStyle((): ViewStyle => {
    return {
      top: withTiming(top.value, {
        duration: 300,
      }),
    };
  });

  return (
    <TapGestureHandler
      onHandlerStateChange={onDoubleTap}
      numberOfTaps={2}
      ref={doubleTapRef}
    >
      <Animated.View
        style={[
          styles.animatedView,
          { zIndex: selectedCard === index ? 10000 : index + 1 },
          cardStyle,
        ]}
      >
        <View style={[styles.card, { backgroundColor: color }]}></View>
        {walletState === WALLET_VIEW.details && selectedCard === index && (
          <TransactionsList
            walletState={walletState}
            transactions={transactions}
          />
        )}
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  animatedView: { position: "absolute", width: "100%", height: "100%" },
  card: {
    borderRadius: 10,
    margin: 20,
    height: 200,
    width: "90%",
  },
});
