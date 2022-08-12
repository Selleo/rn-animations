import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import AirBnBLogo from "../componenets/AirBnbLogo";

const { width, height } = Dimensions.get("window");

const DetailsScreen = () => {
  const navigation = useNavigation();
  const {
    //@ts-ignore
    params: { item },
  } = useRoute();

  return (
    <ScrollView style={styles.container}>
      <SharedElement
        id="header"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 10,
          width: width,
          flexDirection: "row",
          zIndex: 100,
        }}
      >
        <SharedElement id={"logo"}>
          <AirBnBLogo
            pathColor={"black"}
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
      </SharedElement>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <SharedElement id={`${item}.image`}>
          <Image
            style={styles.image}
            source={require("../assets/memozi.png")}
          />
        </SharedElement>
      </Pressable>
      <SharedElement id={`${item}.text`}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            marginTop: 2,
            paddingBottom: 20,
            width: width,
          }}
        >
          <Text style={styles.text}>{item && item}</Text>
        </View>
      </SharedElement>
      <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
        <Text>Sample Title</Text>
        <Text>
          About the apartment ecksdeee etc About the apartment ecksdeee etc
          About the apartment ecksdeee etc About the apartment ecksdeee etc v
          About the apartment ecksdeee etc About the apartment ecksdeee etc
        </Text>
        <Text>
          About the apartment ecksdeee etc About the apartment ecksdeee etc
          About the apartment ecksdeee etc About the apartment ecksdeee etc v
          About the apartment ecksdeee etc About the apartment ecksdeee etc
        </Text>
        <Text>
          About the apartment ecksdeee etc About the apartment ecksdeee etc
          About the apartment ecksdeee etc About the apartment ecksdeee etc v
          About the apartment ecksdeee etc About the apartment ecksdeee etc
        </Text>
        <Text>
          About the apartment ecksdeee etc About the apartment ecksdeee etc
          About the apartment ecksdeee etc About the apartment ecksdeee etc v
          About the apartment ecksdeee etc About the apartment ecksdeee etc
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    height: height * 0.4,
    width: width,
    zIndex: 20,
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: "auto",
  },
});
