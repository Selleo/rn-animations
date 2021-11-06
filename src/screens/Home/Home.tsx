import React from "react";
import { View, StatusBar } from "react-native";

import { AvatarHive } from "@components/AvatarHive";
import Header from "@components/Header/Header";

import styles from "./styles";

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <AvatarHive />
    </View>
  );
};

export default Home;
