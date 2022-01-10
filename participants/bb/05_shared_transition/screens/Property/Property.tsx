import React from "react";
import { Pressable, View, Image, Text, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "../../components/Header";
import Rate from "../../components/Rate";
import { RootStackParamList } from "../../App";

import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Property">;

const Property: React.FC<Props> = ({
  navigation: { goBack },
  route: {
    params: { property },
  },
}) => {
  return (
    <View>
      <SharedElement id={`property.header`} style={styles.headerContainer}>
        <Header logoColor="#ededed" rightSideBackgroundColor="#FF5A5F" />
      </SharedElement>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <Pressable onPress={goBack} style={styles.imageContainer}>
            <SharedElement id={`property.${property.id}.image`}>
              <Image style={styles.image} source={{ uri: property.image }} />
            </SharedElement>
          </Pressable>
          <View style={styles.detailContainer}>
            <View style={styles.titleContainer}>
              <SharedElement id={`property.${property.id}.name`}>
                <Text style={styles.name}>{property.name}</Text>
              </SharedElement>
              <SharedElement id={`property.${property.id}.rate`}>
                <Rate color="black" rate={property.rate} />
              </SharedElement>
            </View>
            <Text style={styles.description}>{property.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Property;
