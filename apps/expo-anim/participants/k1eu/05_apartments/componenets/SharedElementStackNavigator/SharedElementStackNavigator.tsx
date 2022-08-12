import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import List from '../List/List';
import DetailsScreen from '../../screens/Details';

const SharedElementStack = createSharedElementStackNavigator();

export function HomeSharedElementStackNavigator() {
  return (
    <SharedElementStack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <SharedElementStack.Screen name="List" component={List} />
      <SharedElementStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerBackTitleVisible: false,
        }}
        sharedElements={(route) => {
          const { item } = route.params;
          if (route.name === "Details") {
            // Open animation fades in image, title and description
            return [
              {
                id: `${item}.image`,
                animation: "move",
                resize: "clip",
                align: "center-top",
              },
              {
                id: `${item}.text`,
                animation: "fade",
                resize: "clip",
                align: "center-center",
              },
              {
                id: `header`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
              {
                id: `logo`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
              {
                id: `nick`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: `${item}.image`,
                animation: "move",
                resize: "clip",
                align: "center-center",
              },
              {
                id: `${item}.text`,
                animation: "fade",
                resize: "clip",
                align: "center-top",
              },
              {
                id: `header`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
              {
                id: `logo`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
              {
                id: `nick`,
                animation: "fade",
                resize: "auto",
                align: "auto",
              },
            ];
          }
        }}
      />
    </SharedElementStack.Navigator>
  );
}

export default SharedElementStack
