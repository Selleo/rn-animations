import React, { FC } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import styles, { HANDLER_SIZE, PULL_HEIGHT } from "./styles";
import { StyleProp, ViewProps } from "react-native";

const PULL_HEIGHT_WITHOUT_SIZE = PULL_HEIGHT - HANDLER_SIZE;

type ContextType = {
  translate: number;
};

type Props = {
  horizontal?: boolean;
  translate: any;
  container: StyleProp<ViewProps>;
};

const Slider: FC<Props> = (props) => {
  const { translate } = props;

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translate = translate.value;
    },
    onActive: (event, context) => {
      const pullDistance = event.translationY + context.translate;

      translate.value =
        pullDistance < PULL_HEIGHT_WITHOUT_SIZE
          ? pullDistance < 0
            ? 0
            : pullDistance
          : PULL_HEIGHT_WITHOUT_SIZE;
    },
    onEnd: () => {},
  });

  const handler = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translate.value,
        },
      ],
    };
  });

  const rotateProps = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: "-90deg" }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.pullContainer,
        props.container,
        props.horizontal && rotateProps,
      ]}
    >
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.handler, handler]}></Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Slider;
