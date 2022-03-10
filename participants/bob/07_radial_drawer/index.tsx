import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

import CustomDrawer from "./Drawer";

const Stack = createStackNavigator();

const MyDrawer = () => {
  return (
    <>
      <CustomDrawer />
      <Stack.Navigator>
        <Stack.Screen name="Main" component={() => <Text>Main</Text>} />
        <Stack.Screen name="Users" component={() => <Text>Users</Text>} />
        <Stack.Screen name="Feed" component={() => <Text>Feed</Text>} />
        <Stack.Screen name="Article" component={() => <Text>Article</Text>} />
        <Stack.Screen
          name="Managment"
          component={() => <Text>Managment</Text>}
        />
      </Stack.Navigator>
    </>
  );
};

export default MyDrawer;
