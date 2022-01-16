import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { Properties, Property } from "./screens";
import { PropertyDTO } from "./consts";

export type RootStackParamList = {
  Property: { property: PropertyDTO };
  Properties: undefined;
};

export type TabNavigatorParamList = {
  PropertyStack: undefined;
};

const TabNavigator = createBottomTabNavigator<TabNavigatorParamList>();
const Stack = createSharedElementStackNavigator<RootStackParamList>();

const PropertyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Properties"
        component={Properties}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Property"
        component={Property}
        sharedElements={(route) => {
          const { property } = route.params;

          return [
            {
              animation: "move",
              resize: "clip",
              align: "center-top",
              id: `property.${property.id}.image`,
            },
            {
              animation: "fade",
              resize: "clip",
              align: "left-center",
              id: `property.${property.id}.name`,
            },
            {
              animation: "fade",
              resize: "clip",
              align: "right-center",
              id: `property.${property.id}.rate`,
            },
            {
              animation: "fade",
              resize: "auto",
              align: "auto",
              id: `property.header`,
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        options={{ tabBarIcon: () => null, headerShown: false }}
        name="PropertyStack"
        component={PropertyStack}
      />
    </TabNavigator.Navigator>
  );
};

export default App;
