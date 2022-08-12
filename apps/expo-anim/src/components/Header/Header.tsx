import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "@components/MainStack/MainStack";

type Navigation = NativeStackScreenProps<MainStackParamList>;

const Header = () => {
  const { navigate } = useNavigation();
  const [loaded] = useFonts({
    MontserratSubrayada: require("@assets/fonts/MontserratSubrayada.ttf"),
  });

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  const goToComponents = () => navigate('Components');

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.header}>RN-Animations</Text>
      <TouchableOpacity onPress={goToComponents}>
        <Text>
          Go to components
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "MontserratSubrayada",
    fontSize: 40,
  },
});

export default Header;
