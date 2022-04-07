import React, { Suspense } from "react";
import { View, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { MainStackParamList } from "@components/MainStack/MainStack";
import { paths } from "@src/constants/paths";

type Route = RouteProp<MainStackParamList, "ProjectView">;

function ProjectViewer() {
  const {
    params: { id, name },
  } = useRoute<Route>();

  const item = paths[id].find((el) => el.name === name);

  if (!item || !item?.component) {
    return (
      <View>
        <Text>404 Not Found</Text>
      </View>
    );
  }

  const Component = item.component;

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }
    >
      <Component />
    </Suspense>
  );
}

export default ProjectViewer;
