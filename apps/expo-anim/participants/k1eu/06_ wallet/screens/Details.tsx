import { ScrollView, StyleSheet, Text, View } from "react-native";
import { type StackScreenProps } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import store from "../store";
import { type StackParams } from "../components/Navigator/Navigator";
import { SharedElement } from "react-navigation-shared-element";
import Card from "../components/Card";

type RouteProps = StackScreenProps<StackParams, "Details">["route"];
type NavigationProps = StackScreenProps<StackParams, "Details">["navigation"];

const Details = () => {
  const {
    params: { id },
  } = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();

  const cardData = store.find((i) => i.id === id);

  const handleNavigation = (id: string) => {
    navigation.goBack();
  };

  if (!cardData) {
    handleNavigation("1");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SharedElement id={`${cardData!.id}.card`}>
        <Card
          //@ts-ignore
          data={cardData}
          index={0}
          onPress={handleNavigation}
        />
      </SharedElement>
      {cardData?.transactions.map((transaction, index) => (
        <Animated.View key={transaction.id} style={styles.transaction} entering={FadeInUp.delay(500 + 100 * index)} exiting={FadeOutDown}>
          <View style={styles.image}/>
          <View>
            <Text style={styles.text}>{transaction.date}</Text>
          </View>
          <View>
            <Text style={styles.text}>{transaction.amount}</Text>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  transaction: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    width: '100%',
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 10,
  }
});

export default Details;
