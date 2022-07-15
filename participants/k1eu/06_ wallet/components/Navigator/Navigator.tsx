import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Details from '../../screens/Details';
import ListScreen from '../../screens/List';


export type StackParams = {
  List: undefined;
  Details: { id: string };
}

const Stack = createSharedElementStackNavigator<StackParams>();

const Navigator = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerBackTitleVisible: false,
        }}
        sharedElements={(route) => {
          const { id } = route.params;
          if (route.name === "Details") {
            // Open animation fades in image, title and description
            return [
              {
                id: `${id}.card`,
                animation: "move",
                resize: "clip",
                align: "center-top",
              },
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: `${id}.card`,
                animation: "move",
                resize: "clip",
                align: "center-center",
              },
            ];
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default Navigator
