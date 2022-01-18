import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, Pressable, View, Image, StyleSheetProperties, ViewStyle } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { type TCard } from "../../store";
import { type StackParams } from "../Navigator/Navigator";

import styles from "./styles";

type NavigationProps = StackScreenProps<StackParams, "Details">["navigation"];
type RouteProps = StackScreenProps<StackParams>["route"];

type Props = {
  data: TCard;
  index: number
  isListOpen: SharedValue<boolean>;
  onPress: (id: string) => void;
  style?: ViewStyle;
};

import { cardHeight } from "../Card/styles";

const marginTop = cardHeight / 2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Card = ({ data, isListOpen, index, onPress, style }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  const onPressHandler = () => {
    onPress(data.id);
  }

  const animatedCardStyles = useAnimatedStyle(() => ({
    marginTop: 20,
    transform: [
      {
        translateY: withTiming((isListOpen.value && index !== 0) ? 0 : -150 * index)
      }
    ]
  }));

  return (
    <AnimatedPressable style={[styles.cardWrapper, index !== 0 && animatedCardStyles, style ]} onPress={onPressHandler}>
      <Image style={styles.cardBackground} source={{ uri: data.image }}/>
      <View style={styles.cardDetails}>
        <Text style={styles.cardOwner}>{data.owner}</Text>
        <Text style={styles.cardNumber}>{data.number}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default Card;
