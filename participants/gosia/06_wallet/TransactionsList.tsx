import Animated from "react-native-reanimated";
import React from "react";

import { Transaction } from "./types";
import { TransactionView } from "./TransactionView";

type Props = {
  transactions: Transaction[];
};

export const TransactionsList: React.FC<Props> = ({ transactions }) => {
  return (
    <Animated.FlatList
      data={transactions}
      style={{ height: "100%" }}
      keyExtractor={(transaction: Transaction) => transaction.id}
      renderItem={({ item }: { item: Transaction }) => (
        <TransactionView transaction={item}></TransactionView>
      )}
    />
  );
};

export default TransactionsList;
