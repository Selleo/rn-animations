import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { ParticipantProjects } from "@screens/ParticipantProjects";
import { ProjectViewer } from "@src/screens/ProjectViewer";

const Stack = createNativeStackNavigator<MainStackParamList>();

export type MainStackParamList = {
  Home: undefined;
  ParticipantProjects: { id: string };
  ProjectView: { id: string; name: string };
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ParticipantProjects"
        component={ParticipantProjects}
      />
      <Stack.Screen name="ProjectView" component={ProjectViewer} />
    </Stack.Navigator>
  );
};

export default MainStack;
