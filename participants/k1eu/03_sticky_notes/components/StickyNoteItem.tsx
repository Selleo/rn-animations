import React, { useState } from "react";
import {
  TextInput,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  PanGestureHandler,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import styles from "./styles";

// array of random hex colors
const colors = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#F472B6",
];

type Props = {
  index: number;
  getNewZIndex: any;
  label: string;
};

type GestureHandler = {
  dragX: number;
  dragY: number;
};

const StickyNoteItem = ({ index, getNewZIndex, label }: Props) => {
  const [text, setText] = useState(label);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { width, height } = useWindowDimensions();

  const boundedStartValue = (index * 10) % (width - 100);

  // dragging coordinates
  const draggedNoteY = useSharedValue(0);
  const draggedNoteX = useSharedValue(boundedStartValue);
  const draggedZIndex = useSharedValue(index);

  // helper values
  const isDragging = useSharedValue(false);
  const isDrawing = useSharedValue(false);

  // saved coordinates during editing
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);
  const savedZIndex = useSharedValue(0);

  //renders
  const renderCloseButton = () =>
    isDrawing.value ? (
      <TouchableOpacity style={styles.close} onPress={hide}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    ) : null;

  const renderCardTextWithEdit = () =>
    isEditing ? (
      <>
        <TextInput
          value={text}
          onChangeText={setText}
          style={{ textAlign: "center" }}
        />
        <Button title="save" onPress={exitEditMode} />
      </>
    ) : (
      <Text>{text}</Text>
    );

  const enterEditMode = () => {
    if (isFocused) {
      setIsEditing(true);
    }
  };

  const toggleFocusMode = () => setIsFocused(!isFocused);
  const exitEditMode = () => setIsEditing(false);

  const eventHandler = useAnimatedGestureHandler({
    onStart: ({ absoluteX, absoluteY }, ctx: GestureHandler) => {
      ctx.dragX = absoluteX - 50;
      ctx.dragY = absoluteY - 150;
      draggedZIndex.value = getNewZIndex();
      isDragging.value = true;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      draggedNoteX.value = ctx.dragX + translationX;
      draggedNoteY.value = ctx.dragY + translationY;
    },
    onEnd: () => {
      isDragging.value = false;
    },
  });

  const onLongPress = (
    e: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>
  ) => {
    if (e.nativeEvent.state === 4 && !isDrawing.value) {
      runOnJS(toggleFocusMode)();
      savedX.value = draggedNoteX.value;
      savedY.value = draggedNoteY.value;
      savedZIndex.value = draggedZIndex.value;
      isDrawing.value = true;
      draggedZIndex.value = getNewZIndex();
    }
  };

  const hide = () => {
    "worklet";
    draggedNoteX.value = savedX.value;
    draggedNoteY.value = savedY.value;
    draggedZIndex.value = savedZIndex.value;
    savedZIndex.value = 0;
    savedX.value = 0;
    savedY.value = 0;
    isDrawing.value = false;
    runOnJS(toggleFocusMode)();
    runOnJS(exitEditMode)();
  };

  const animatedStylesNote = useAnimatedStyle(() => ({
    top: isDrawing.value
      ? withTiming(height * 0.5 - (width * 0.9) / 2)
      : draggedNoteY.value,
    left: isDrawing.value ? withTiming((width * 0.1) / 2) : draggedNoteX.value,
    transform: [{ scale: isDragging.value ? withSpring(1.15) : withSpring(1) }],
    shadowOpacity: isDragging.value ? withTiming(0.75) : withTiming(0.1),
    zIndex: draggedZIndex.value,
    width: isDrawing.value ? withSpring(width * 0.9) : withTiming(100),
    height: isDrawing.value ? withSpring(width * 0.9) : withTiming(100),
  }));

  const animatedZIndex = useAnimatedStyle(() => ({
    zIndex: draggedZIndex.value,
  }));

  return (
    <LongPressGestureHandler onHandlerStateChange={onLongPress}>
      <Animated.View style={[styles.container, animatedZIndex]}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            style={[
              animatedStylesNote,
              styles.item,
              {
                backgroundColor: colors[index % 7],
              },
            ]}
          >
            {renderCloseButton()}
            <TouchableOpacity onPress={enterEditMode}>
              {renderCardTextWithEdit()}
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default StickyNoteItem;
