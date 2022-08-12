import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SkiaTest from "@components/SkiaTest";
import { MainStack } from "@components/MainStack";
import Card from "@components/Card";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.main}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
