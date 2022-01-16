import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import DetailsScreen from "../../screens/Details";
import AirBnBLogo from "../AirBnbLogo";

const { width, height } = Dimensions.get("window");

const homes = [
  "Warsaw",
  "Krakow",
  "Bielsko-Biala",
  "Gdansk",
  "Gdynia",
  "Sopot",
];

const List = () => {
  const navigation = useNavigation();

  const goToDetails = (name) => {
    navigation.navigate("Details", { item: name });
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View key={item} style={styles.cardContainer}>
        <Pressable style={styles.cardBody} onPress={() => goToDetails(item)}>
          <SharedElement id={`${item}.image`}>
            <Image
              style={styles.image}
              source={require("../../assets/memozi.png")}
              resizeMode="cover"
            />
          </SharedElement>
          <SharedElement id={`${item}.text`}>
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                padding: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                bottom: 0,
                right: 0,
              }}
            >
              <Text style={styles.text}>{item}</Text>
            </View>
          </SharedElement>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SharedElement
        id="header"
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 10,
          flexDirection: "row",
        }}
      >
        <>
          <SharedElement id={"logo"}>
            <AirBnBLogo
              style={{
                width: 200,
                height: 50,
              }}
            />
          </SharedElement>
          <SharedElement id={"nick"}>
            <Text
              style={{
                fontSize: 30,
              }}
            >
              k1euek
            </Text>
          </SharedElement>
        </>
      </SharedElement>
      <FlatList
        data={homes}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item) => item}
        pagingEnabled={true}
      />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  cardContainer: {
    width: width,
    height: height * 0.7,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  cardBody: {
    height: height * 0.6,
    width: width * 0.8,
    zIndex: 1,
    overflow: "hidden",
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    zIndex: 1,
  },
});
