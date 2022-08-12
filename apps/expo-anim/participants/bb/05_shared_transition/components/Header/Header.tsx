import React from "react";

import { View, Text } from "react-native";

import Logo from "../Logo";

import styles from "./styles";

type Props = {
  rightSideBackgroundColor?: string;
  logoColor?: string;
};

const Header: React.FC<Props> = ({
  logoColor = "white",
  rightSideBackgroundColor = "white",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo width="100%" height={40} fill={logoColor} />
      </View>
      <View
        style={[
          styles.rightSide,
          { backgroundColor: rightSideBackgroundColor },
        ]}
      >
        <Text style={styles.rightSideText}>Bartosz Boruta</Text>
      </View>
    </View>
  );
};

export default Header;
