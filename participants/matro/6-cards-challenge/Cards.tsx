import { useEffect, useState } from "react";
import { Text, StyleSheet, Share } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import Card from "./Card";

const Cards = () => {
  // 0 - cards fully visible
  // 1 - cards stacked
  // 2 - card details
  const cardsState = useSharedValue(0);
  const [zIndexes, setZIndexes] = useState([0, 1, 2]);

  const switchTo = (newMode: number, cardIndex?: number) => {
    if (cardIndex || cardIndex === 0) {
      const newZindexes = [0, 0, 0];
      newZindexes[cardIndex] = 1;
      setZIndexes(newZindexes);
    }
    if (cardsState.value === 2 && newMode === 2) {
      cardsState.value = 0;
    } else {
      cardsState.value = newMode;
    }
  };

  return (
    <>
      <Text style={styles.walletLabel}>Wallet</Text>
      <Card
        switchTo={switchTo}
        cardsState={cardsState}
        zIndex={zIndexes[0]}
        index={0}
        color="slategray"
      />
      <Card
        switchTo={switchTo}
        cardsState={cardsState}
        zIndex={zIndexes[1]}
        index={1}
        color="gray"
      />
      <Card
        switchTo={switchTo}
        cardsState={cardsState}
        zIndex={zIndexes[2]}
        index={2}
        color="darkgray"
      />
      <Card
        switchTo={switchTo}
        cardsState={cardsState}
        zIndex={zIndexes[2]}
        index={3}
        color="black"
      />
    </>
  );
};

export default Cards;

const styles = StyleSheet.create({
  walletLabel: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
  },
});
