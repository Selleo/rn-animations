import React from "react";
import { Text, View } from "react-native";
import { transactionsList } from "./constants";
import Animated, { FadeIn } from "react-native-reanimated";

import styles from "./styles";

const Transactions = () => {
  return (
    <View style={styles.container}>
      {transactionsList.map((item, index) => (
        <Animated.View
          key={index}
          entering={FadeIn.delay(700 + index * 200)}
          style={styles.transaction}
        >
          <View style={styles.image}></View>
          <View style={styles.body}>
            <Text numberOfLines={1} style={styles.shop}>
              {item.shop}
            </Text>
            <Text numberOfLines={1} style={styles.category}>
              {item.category}
            </Text>
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};
export default Transactions;
