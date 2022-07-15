import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";
import { TransactionDTO } from "../../../../consts";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type Props = {
  item: TransactionDTO;
  index: number;
};

const Transaction: React.FC<Props> = ({ item, index }) => {
  const opacity = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1));
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image style={styles.logo} source={{ uri: item.sellerLogo }} />
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={styles.row}>
          <Text style={styles.title}>{item.sellerName}</Text>
          <Text style={styles.title}>{item.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>{item.productName}</Text>
          <Text style={styles.description}>{item.date}</Text>
        </View>
      </View>

      <Text>{}</Text>
    </Animated.View>
  );
};

export default Transaction;
