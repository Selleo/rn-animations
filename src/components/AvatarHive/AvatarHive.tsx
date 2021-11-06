import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MainStackParamList } from "@components/MainStack/MainStack";
import { Avatar } from "@components/Avatar";
import { People } from "@src/constants/people";

import styles from './styles';

type Navigation = NativeStackNavigationProp<MainStackParamList>;

const people = Object.entries(People);

function AvatarHive() {
  const navigation = useNavigation<Navigation>();

  const navigateTo = (destination: string) => () => {
    navigation.navigate("ParticipantProjects", { id: destination });
  };

  const renderRow = (from: number, to: number) => (
    <View style={styles.row}>
      {people.slice(from, to).map((person, index) => (
        <Avatar
          key={person[0]}
          img={person[1].img}
          style={{ marginLeft: index === 0 ? 0 : 10 }}
          onPress={navigateTo(person[0])}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderRow(0, 3)}
      {renderRow(3, 5)}
      {renderRow(5, 6)}
    </View>
  );
}

export default AvatarHive;
