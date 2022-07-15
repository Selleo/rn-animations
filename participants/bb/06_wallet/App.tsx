import { useFonts } from "expo-font";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { CardDTO } from "./consts";
import { Cards, CardDetails } from "./screens";

export type RootStackParamList = {
  CardDetails: {
    card: CardDTO;
  };
  Cards: undefined;
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [loaded] = useFonts({
    RobotoBold: require("@assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("@assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("@assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
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
            name="Cards"
            component={Cards}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CardDetails"
            component={CardDetails}
            sharedElements={(route) => {
              const {
                params: { card },
              } = route;

              return [
                {
                  animation: "move",
                  resize: "clip",
                  align: "center-top",
                  id: `card.${card.id}.image`,
                },
                {
                  animation: "fade",
                  resize: "clip",
                  align: "left-center",
                  id: `card.${card.id}.ownerName`,
                },
                {
                  animation: "fade",
                  resize: "clip",
                  align: "left-center",
                  id: `card.${card.id}.number`,
                },
              ];
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
