import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { View } from "react-native";
import DetailScreen from "./DetailsScreen";
import ListScreen from "./ListScreen";

const Stack = createSharedElementStackNavigator();

const Homes = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        sharedElements={(route, _otherRoute, _showing) => {
          const { item } = route.params;
          return [`item.${item.id}.photo`];
        }}
      />
    </Stack.Navigator>
  );
};

export default Homes;
