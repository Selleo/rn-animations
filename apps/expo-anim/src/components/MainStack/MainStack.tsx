import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { ParticipantProjects } from "@screens/ParticipantProjects";
import { ProjectViewer } from "@src/screens/ProjectViewer";
import ComponentsScreen from "@screens/ComponentsScreen/ComponentsScreen";

const Stack = createNativeStackNavigator<MainStackParamList>();

export type MainStackParamList = {
  Components: undefined;
  Home: undefined;
  ParticipantProjects: { id: string };
  ProjectView: { id: string; name: string };
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
      />
      <Stack.Screen
        name="ParticipantProjects"
        component={ParticipantProjects}
      />
      <Stack.Screen
        name="ProjectView"
        component={ProjectViewer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
