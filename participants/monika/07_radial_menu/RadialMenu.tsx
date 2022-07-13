import { Button, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useDerivedValue,
  FadeInLeft,
  FadeOutLeft,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  // TouchableOpacity,
} from "react-native-gesture-handler";
import { R, items } from "./constants";

import { styles } from "./style";

const RadialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerOpen = useSharedValue(0);
  const rotation = useSharedValue(0);
  const rotattioOffset = useDerivedValue(() => rotation.value);
  const offset = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.pos = rotation.value;
    },
    onActive: (event, context) => {
      rotation.value = context.pos + (event.translationY * 3) / R;
    },
    onEnd: (event, context) => {
      rotation.value = Math.round(context.pos + (event.translationY * 3) / R);
      drawerOpen.value = event.translationX < -50 ? 0 : 1;
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.innerCircle]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsOpen((prev) => !prev)}
          />
        </Animated.View>
        {isOpen && (
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View
              entering={ZoomIn.duration(500)}
              exiting={ZoomOut.duration(500)}
              style={styles.circle}
            >
              {items.map((item, index) => (
                <MenuItem
                  label={item}
                  index={index}
                  key={index}
                  rotation={rotattioOffset}
                  itemsLength={items.length}
                />
              ))}
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
    </>
  );
};

export default RadialMenu;
