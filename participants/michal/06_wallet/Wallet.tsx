import { useCallback, useState } from "react";
import {  SafeAreaView, StyleSheet } from "react-native"
import Animated from "react-native-reanimated";

import { Card } from "./components/Card";

type CardItem = {
  id: number,
  author: string;
  color: string;
  title: string;
}

const cards: CardItem[] = [
  { id: 1, title: "Card 1", author: "John", color: "#1ca5d3" },
  { id: 2, title: "Card 2", author: "Jeff", color: "#c70071" },
  { id: 3, title: "Card 3", author: "Mike", color: "#8121e7" },
  { id: 4, title: "Card 4", author: "Joe", color: "#201e20" }
]

const Wallet = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

  const handleCardOnPress = useCallback((item: CardItem) => {
    setSelectedCardId(item.id !== selectedCardId ? item.id : null)
  }, [selectedCardId])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        style={styles.list}
        data={cards}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          if (selectedCardId !== null && selectedCardId !== item.id) {
            return null
          }

          return (
            <Card
              title={item.title}
              author={item.author}
              color={item.color}
              index={index}
              isSelected={item.id === selectedCardId}
              onPress={() => handleCardOnPress(item)}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 32
  }
})

export default Wallet;
