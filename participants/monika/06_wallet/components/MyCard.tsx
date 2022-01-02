import React from "react";
import { Image } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  LongPressGestureHandler,
  TapGestureHandlerStateChangeEvent,
  LongPressGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { CARD_HEIGHT, CARD_WIDTH } from "./constants";
interface Props {
  card: {
    id: number;
  };
  onClick: (cardId: number) => void;
  onDoubleClick: () => void;
}

const MyCard = (props: Props) => {
  const {
    card: { id },
    onClick,
    onDoubleClick,
  } = props;

  const longPressRef = React.createRef<TapGestureHandler>();
  const picture = {
    1: require(`../assets/card1.jpeg`),
    2: require(`../assets/card2.jpeg`),
    3: require(`../assets/card3.jpeg`),
    4: require(`../assets/card4.jpeg`),
    5: require(`../assets/card5.jpeg`),
  };
  const onSingleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onClick(id);
    }
  };
  const onLongPress = (event: LongPressGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onDoubleClick();
    }
  };

  return (
    <>
      <LongPressGestureHandler
        onHandlerStateChange={onLongPress}
        minDurationMs={500}
      >
        <TapGestureHandler
          waitFor={longPressRef}
          onHandlerStateChange={onSingleTap}
        >
          <Animated.View
            entering={ZoomInEasyDown.delay(200 * id - 1).duration(1200)}
            style={{
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
            }}
          >
            <Image
              source={picture[id % 5]}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                borderColor: "white",
                borderWidth: 1,
              }}
            />
          </Animated.View>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </>
  );
};

export default MyCard;
