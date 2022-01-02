import React from "react";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  LongPressGestureHandler,
  TapGestureHandlerStateChangeEvent,
  LongPressGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
interface Props {
  card: {
    id: number;
    color: string;
  };
  onClick: (cardId: number) => void;
  onDoubleClick: () => void;
}

const CARD_HEIGHT = 200;

const MyCard = (props: Props) => {
  const {
    card: { color, id },
    onClick,
    onDoubleClick,
  } = props;

  const longPressRef = React.createRef<TapGestureHandler>();

  const onSingleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("I'm touched", color);
      onClick(id);
    }
  };
  const onLongPress = (event: LongPressGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("I'm double touched", color);
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
              backgroundColor: color,
              height: CARD_HEIGHT,
              width: 300,
              borderRadius: 40,
            }}
          ></Animated.View>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </>
  );
};

export default MyCard;
