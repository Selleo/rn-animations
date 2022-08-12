import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { Card, Transaction, WALLET_VIEW } from "./types";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import React, { useState } from "react";

import { CardView } from "@participants/gosia/06_wallet/CardView";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

var randomColor = require("randomcolor"); // import the script

const createCardTransactions = (): Transaction[] => {
  const fake: string[] = new Array(20).fill("test");
  const data: Transaction[] = fake.map(() => ({
    id: 'faker.datatype.uuid()',
    name: 'faker.company.companyName()',
    currency: 'faker.finance.currencyCode()',
    avatar: 'faker.image.business()',
    amount: 'faker.finance.amount()',
    date: 'faker.datatype.datetime()',
  }));

  return data;
};

export const Wallet = () => {
  const [state, setState] = useState<WALLET_VIEW>(WALLET_VIEW.default);
  const [lastState, setLastState] = useState<WALLET_VIEW>(WALLET_VIEW.all);
  const [selectedCard, setSelectedCard] = useState<number | undefined>();
  const [cards, setCards] = useState<Card[]>([
    { id: 1, color: "green", transactions: createCardTransactions() },
    { id: 2, color: "red", transactions: createCardTransactions() },
  ]);

  const setWalletState = (newState: React.SetStateAction<WALLET_VIEW>) => {
    setLastState(state);
    setState(newState);
  };

  const addNewCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards[prevCards.length - 1].id + 1,
        color: randomColor(),
        transactions: createCardTransactions(),
      },
    ]);
  };

  const selectCard = (index: React.SetStateAction<number | undefined>) => {
    if (selectedCard === undefined) {
      setSelectedCard(index);
      setWalletState(WALLET_VIEW.details);
    } else {
      setSelectedCard(undefined);
      setWalletState(lastState);
    }
  };

  const panGestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      if (Math.abs(event.velocityY) > 2) {
        runOnJS(setSelectedCard)(undefined);
        if (event.translationY < 0) {
          runOnJS(setWalletState)(WALLET_VIEW.default);
        } else {
          runOnJS(setWalletState)(WALLET_VIEW.all);
        }
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={{ height: "100%" }}>
        {/* <ScrollView> */}
        {cards.map((card, index) => {
          return (
            <CardView
              key={card.id}
              card={card}
              selectCard={() => selectCard(index)}
              index={index}
              walletState={state}
              selectedCard={selectedCard}
            />
          );
        })}
        {/* </ScrollView> */}
        {state === WALLET_VIEW.default && (
          <FAB style={styles.fab} icon="plus" onPress={() => addNewCard()} />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    left: "50%",
    bottom: 50,
    zIndex: 50,
  },
});

export default Wallet;
