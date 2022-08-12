import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SkiaTest from "@components/SkiaTest";
import Card from "@components/Card";

const Components = {
  SkiaTest: SkiaTest,
  Card: Card,
};

type ComponentKeys = keyof typeof Components;

const ComponentsScreen = () => {
  const [componentName, setComponentName] = useState<string | null>(null);

  const CurrentComponent = Components[componentName as ComponentKeys] || null;

  return (
    <View style={{ flex: 1 }}>
      {Object.keys(Components).map((component) => (
        <Button title={component} onPress={() => setComponentName(component)} />
      ))}
      {CurrentComponent && <CurrentComponent />}
    </View>
  );
};

export default ComponentsScreen;

const styles = StyleSheet.create({});
