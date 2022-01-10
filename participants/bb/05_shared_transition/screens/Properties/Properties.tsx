import React from "react";
import {
  FlatList,
  View,
  Pressable,
  Text,
  Image,
  ListRenderItem,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Header from "../../components/Header";
import Rate from "../../components/Rate";
import { PROPERTIES, PropertyDTO } from "../../consts";
import { RootStackParamList } from "../../App";

import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Properties">;

const Properties: React.FC<Props> = ({ navigation }) => {
  const [loaded] = useFonts({
    RobotoBold: require("@assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("@assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("@assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const renderProperty: ListRenderItem<PropertyDTO> = ({ item, index }) => {
    return (
      <View style={styles.propertyContainer}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => navigation.navigate("Property", { property: item })}
        >
          <SharedElement id={`property.${item.id}.image`}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: item.image }}
            />
          </SharedElement>
          <View>
            <SharedElement id={`property.${item.id}.name`}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </SharedElement>
            <SharedElement id={`property.${item.id}.rate`}>
              <View style={styles.rateContainer}>
                <Rate rate={item.rate} />
              </View>
            </SharedElement>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SharedElement id={`property.header`}>
        <Header logoColor="#FF5A5F" rightSideBackgroundColor="#ededed" />
      </SharedElement>

      <FlatList<PropertyDTO>
        pagingEnabled={true}
        horizontal={true}
        data={PROPERTIES}
        renderItem={renderProperty}
      />
    </View>
  );
};

export default Properties;
