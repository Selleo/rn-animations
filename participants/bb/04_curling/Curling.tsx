import React, { useState } from "react";
import { View, Image, Text } from "react-native";

import Stone from "./Stone";
import styles from "./styles";

const Curling: React.FC = () => {
  const [distance, setDistance] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Distance: {distance}</Text>
      <Image style={styles.point} source={require("./point.png")} />
      <View style={styles.line} />
      <Stone setDistance={setDistance} />
    </View>
  );
};

export default Curling;
