import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { SlideInLeft, SlideOutLeft, useAnimatedStyle, withTiming } from "react-native-reanimated";

export type CardProps = {
  author: string;
  color: string;
  title: string;
  index: number;
  onPress: () => void;
  isSelected?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card = ({
  title,
  author,
  color,
  index,
  onPress,
  isSelected = false
}: CardProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    top: withTiming(isSelected ? 0 : 80 * index)
  }))

  return (
    <AnimatedPressable
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      onPress={onPress}
      style={[styles.card, animatedStyle, { backgroundColor: color }]}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.text, styles.header]}>
          {title}
        </Text>
        <Text style={styles.text}>
          {author}
        </Text>
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    elevation: 24,
    position: 'absolute',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 24,
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600'
  },
  header: {
    fontSize: 32
  }
})
