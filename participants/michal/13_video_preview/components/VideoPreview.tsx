import { Dimensions, StyleSheet } from 'react-native';
import React, { ReactNode, forwardRef, useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type VideoPreviewProps = {
  children: ReactNode;
  onFullScreen?: () => void
  onMinimize?: () => void
};

export type VideoPreviewRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

export const VideoPreview = forwardRef<VideoPreviewRefProps, VideoPreviewProps>(
  ({ children, onFullScreen, onMinimize }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({ y: 0 });

    const transformStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const runFullScreen = useCallback(() => {
      'worklet';
      if (!!onFullScreen) {
        runOnJS(onFullScreen)()
      }
    }, [onFullScreen])

    const runMinimized = useCallback(() => {
      'worklet';
      if (!!onMinimize) {
        runOnJS(onMinimize)()
      }
    }, [onMinimize]);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 1.5) {
          scrollTo(-100);

          runMinimized()
        } else if (translateY.value < -SCREEN_HEIGHT / 5) {
          scrollTo(MAX_TRANSLATE_Y);

          runFullScreen()
        }
      });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, transformStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#0f0f0f',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
  },
});
