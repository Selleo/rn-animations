import { Dimensions, Pressable, StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
  ZoomOut,
  ZoomOutDown,
} from "react-native-reanimated";
import { white } from "react-native-paper/lib/typescript/styles/colors";

const { width, height } = Dimensions.get("window");

const people = [
  {
    id: 1,
    name: "John",
    age: 25,
  },
  {
    id: 2,
    name: "Jane",
    age: 23,
  },
  {
    id: 3,
    name: "Bob",
    age: 27,
  },
  {
    id: 4,
    name: "Mary",
    age: 22,
  },
  {
    id: 5,
    name: "Mike",
    age: 24,
  },
];

const ACTION_THRESHOLD_POSITIVE = width / 2 - 10;
const ACTION_TRESHOLD_NEGATIVE = width / 2 - 10;
const ZOOM_OUT_DURATION = 200;

const CardPlaceholder = ({ onReset }) => {
  return (
    <Animated.View
      style={[styles.card, styles.cardPlaceholder]}
      entering={ZoomIn.delay(100)}
    >
      <Pressable onPress={onReset}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          No more horny in your neighbourhood
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Card = ({ enabled, index, person, onRemove }) => {
  const xPos = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = xPos.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      xPos.value = ctx.x + translationX;
    },
    onEnd: () => {
      console.log(xPos.value, ACTION_THRESHOLD_POSITIVE);
      if (xPos.value > 0 && xPos.value > ACTION_THRESHOLD_POSITIVE) {
        runOnJS(onRemove)(person.id);
        // return;
      } else if (xPos.value < 0 && xPos.value < ACTION_TRESHOLD_NEGATIVE) {
        runOnJS(onRemove)(person.id);
        // return;
      } else {
        console.log("test");
        xPos.value = withSpring(0);
      }
    },
  });

  const cardAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: xPos.value,
      },
      {
        rotateZ: interpolate(
          xPos.value,
          [-width / 2, 0, width / 2],
          [-0.2, 0, 0.2],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        {
          zIndex: index,
        },
      ]}
      entering={ZoomIn}
      exiting={ZoomOut.duration(ZOOM_OUT_DURATION)}
    >
      <PanGestureHandler onGestureEvent={panGestureEvent} enabled={enabled}>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: "gray",
            },
            cardAnimatedStyles,
          ]}
        >
          <Text>{person.name}</Text>
          <Text>{person.age}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const Tinder = () => {
  const [peoepleList, setPeople] = React.useState(people);

  const peopleSize = peoepleList.length;

  const onRemove = (id: number) => {
    setPeople((people) => people.filter((person) => person.id !== id));
  };
  const reset = () => setPeople(people);

  return (
    <View style={styles.container}>
      {peoepleList.length > 0 ? (
        peoepleList.map((person, index) => (
          <Card
            key={person.id}
            person={person}
            index={peopleSize - index}
            enabled={index === 0}
            onRemove={onRemove}
          />
        ))
      ) : (
        <CardPlaceholder onReset={reset} />
      )}
    </View>
  );
};

export default Tinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  card: {
    width: width * 0.7,
    height: width * 0.7 * 1.5,
    position: "absolute",
  },
  cardPlaceholder: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
