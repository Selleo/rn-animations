import React from "react";
import {
  Pressable,
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  ListRenderItem,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import { CardDTO, TransactionDTO } from "../../../consts";
import Animated from "react-native-reanimated";
import Transaction from "./Transaction";

type Props = {
  transactions: TransactionDTO[];
};

const Transactions: React.FC<Props> = ({ transactions = [] }) => {
  const renderTransaction: ListRenderItem<TransactionDTO> = ({
    item,
    index,
  }) => {
    return <Transaction item={item} index={index} />;
  };

  return (
    <FlatList<TransactionDTO>
      // renderItem={Transaction}
      renderItem={renderTransaction}
      data={transactions}
      style={styles.container}
    />
  );
};

export default Transactions;
