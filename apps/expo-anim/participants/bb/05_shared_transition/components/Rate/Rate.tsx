import React, { useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";

import { View } from "react-native";

import styles from "./styles";

type Props = {
  color?: string;
  rate: 1 | 2 | 3 | 4 | 5;
  width?: number;
  height?: number;
};

const RATING = [...Array(5).keys()];

const Rate: React.FC<Props> = ({
  color = "white",
  rate,
  width = 100,
  height = 16,
}) => {
  const renderRating = useMemo(() => {
    return RATING.map((item, index) => {
      const iconName = item < rate ? "star" : "staro";

      return (
        <AntDesign
          color={color}
          key={index}
          name={iconName}
          style={styles.icon}
        />
      );
    });
  }, [rate]);

  return <View style={[styles.container]}>{renderRating}</View>;
};

export default Rate;
