import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

const Header = () => {
  const [loaded] = useFonts({
    MontserratSubrayada: require("@assets/fonts/MontserratSubrayada.ttf"),
  });

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.header}>RN-Animations</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "MontserratSubrayada",
    fontSize: 40,
  },
});

export default Header;
