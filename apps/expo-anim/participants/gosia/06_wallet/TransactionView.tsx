import { Avatar } from "react-native-paper";
import { Text, View, ViewStyle, Image } from "react-native";
import { StyleSheet } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { useEffect } from "react";
import { Transaction, WALLET_VIEW } from "./types";

type Props = {
  transaction: Transaction;
  walletState: WALLET_VIEW;
};

export const TransactionView: React.FC<Props> = ({
  transaction,
  walletState,
}) => {
  const height = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      if (walletState === WALLET_VIEW.details) {
        height.value = 0;
      } else {
        height.value = 50;
      }
    }, 300);
  }, [walletState]);

  const cardStyle = useAnimatedStyle((): ViewStyle => {
    return {
      height: withSpring(height.value),
    };
  });

  return (
    <Animated.View style={[styles.item, cardStyle]}>
      <View style={{ justifyContent: "center" }}>
        <Avatar.Image source={{ uri: transaction.avatar }} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text>{transaction.name}</Text>
        <Text>
          {transaction.amount} {transaction.currency}
        </Text>
        <Text>{new Date(transaction.date).toDateString()}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    height: 50,
  },
});
