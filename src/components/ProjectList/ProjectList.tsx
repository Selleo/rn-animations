import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { MainStackParamList } from "@components/MainStack/MainStack";
import { paths, Project } from "@src/constants/paths";

import styles from './styles';

type Navigation = NativeStackNavigationProp<MainStackParamList>;

type Props = {
  id: string,
}

type ProjectListItem = {
  item: Project,
  index: number,
}

const ProjectList = ({ id }: Props) => {
  const navigation = useNavigation<Navigation>();
  const projects = paths[id]

  const navigateToProject = (name: string) => () => {
    navigation.navigate("ProjectView", { id, name });
  };

  const renderItem = ({ item, index }: ProjectListItem) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        index === projects.length-1 &&
        {  borderBottomWidth: 1 }
      ]}
      onPress={navigateToProject(item.name)}
    >
      <Text style={styles.listText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListWithFallback = () => (
    projects.length > 0 ? (
      <FlatList
      data={projects}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      style={styles.listContainer}
    />
    ) : 
    <Text>No projects found</Text>
  )

  return renderListWithFallback();
}

export default ProjectList
