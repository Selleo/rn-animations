import React from "react";
import { Pressable, View, Image, Text, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";

import styles from "./styles";
import Transactions from "./Transactions";

type Props = NativeStackScreenProps<RootStackParamList, "CardDetails">;

const CardDetails: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: { card },
  },
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={goBack} style={styles.imageContainer}>
          <SharedElement id={`card.${card.id}.image`}>
            <Image style={styles.image} source={card.image} />
          </SharedElement>
          <View>
            <SharedElement id={`card.${card.id}.number`}>
              <View style={styles.numberContainer}>
                <Text style={styles.number}>{card.number}</Text>
              </View>
            </SharedElement>
            <SharedElement id={`card.${card.id}.ownerName`}>
              <View style={styles.ownerNameContainer}>
                <Text style={styles.ownerName}>{card.ownerName}</Text>
              </View>
            </SharedElement>
          </View>
        </Pressable>
      </View>
      <Transactions transactions={card.transactions} />
    </View>
  );
};

export default CardDetails;
