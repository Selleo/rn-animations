import React from "react";
import { View, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { MainStackParamList } from "@components/MainStack/MainStack";
import { Avatar } from "@components/Avatar";
import { People } from "@src/constants/people";
import ProjectList from "@components/ProjectList/ProjectList";

import styles from './styles';

type Route = RouteProp<MainStackParamList, "ParticipantProjects">;

function ParticipantProjects() {
  const { params: { id } } = useRoute<Route>();

  return (
    <View style={styles.container}>
      <Avatar img={People[id].img} style={styles.avatar} />
      <Text style={styles.name}>{People[id].displayName}</Text>
      <ProjectList id={id} />
    </View>
  );
}

export default ParticipantProjects;
