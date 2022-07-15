import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../../App";
import { CardDTO } from "../../../consts";

import styles from "./styles";

type Navigation = NativeStackScreenProps<RootStackParamList>;

type Props = {
  card: CardDTO;
  index: number;
  transformAnimation: any;
  lastZIndex: any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card: React.FC<Props> = ({
  card,
  index,
  transformAnimation,
  lastZIndex,
}) => {
  const zIndex = useSharedValue(lastZIndex.value);
  const navigation = useNavigation<Navigation>();

  const navigateToDetails = () => {
    console.log({ card });
    navigation.navigate("CardDetails", { card: card });
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
      position: "absolute",
      transform: [
        {
          translateY: withTiming(transformAnimation.value ? 0 : 250 * index),
          // translateY: interpolate(
          //   transformAnimation.value,
          //   [0, 0.5, 1],
          //   [250 * index, 30 * index, 0],
          //   { extrapolateRight: Extrapolate.CLAMP }
          // ),
          // translateY: withTiming(
          //   interpolate(
          //     transformAnimation.value,
          //     [0, 0.5, 1],
          //     [250 * index, 30 * index, 0],
          //     { extrapolateRight: Extrapolate.CLAMP }
          //   )
          // ),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[styles.imageContainer, containerStyle]}
      onPress={() => {
        lastZIndex.value += 1;
        zIndex.value = lastZIndex.value;
        transformAnimation.value = withTiming(1, {}, () => {
          runOnJS(navigateToDetails)();
        });
      }}
    >
      <SharedElement id={`card.${card.id}.image`}>
        <Image resizeMode="cover" style={styles.image} source={card.image} />
      </SharedElement>
      <View>
        <SharedElement id={`card.${card.id}.number`}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>**** **** **** **** ****</Text>
          </View>
        </SharedElement>
        <SharedElement id={`card.${card.id}.ownerName`}>
          <View style={styles.ownerNameContainer}>
            <Text style={styles.ownerName}>{card.ownerName}</Text>
          </View>
        </SharedElement>
      </View>
    </AnimatedPressable>
  );
};

export default Card;
