import { View, Text } from "react-native";
import React, { useCallback } from "react";
import CardItem from "./CardItem";
import Stack, { StackProps } from "./Stack";
import { Card } from "./Card";
import { cards } from "./cards";

const TindetSwipe = () => {
  const renderItem = useCallback((item) => <CardItem card={item} />, []);

  return <Stack data={cards} renderItem={renderItem} />;
};

export default TindetSwipe;
