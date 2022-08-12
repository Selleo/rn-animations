import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, Pressable, View, Image, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { type TCard } from "../../store";

import styles from "./styles";

type Props = {
  data: TCard;
  index: number;
  isListOpen?: SharedValue<boolean>;
  onPress: (id: string) => void;
  style?: ViewStyle;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = ({ data, isListOpen, index, onPress, style }: Props) => {
  const onPressHandler = () => {
    onPress(data.id);
  };

  const animatedCardStyles = useAnimatedStyle(() => ({
    marginTop: 20,
    transform: [
      {
        translateY: withTiming(
          isListOpen && isListOpen.value && index !== 0 ? 0 : -150 * index
        ),
      },
    ],
  }));


  return (
    <AnimatedPressable
      style={[styles.cardWrapper, index !== 0 && animatedCardStyles, style]}
      onPress={onPressHandler}
    >
      <Image style={styles.cardBackground} source={{ uri: data.image }} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardOwner}>{data.owner}</Text>
        <Text style={styles.cardNumber}>{data.number}</Text>
      </View>
    </AnimatedPressable>
  );
};

export default Card;
