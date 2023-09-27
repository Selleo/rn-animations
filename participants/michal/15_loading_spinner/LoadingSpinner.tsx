import { useEffect } from 'react';
import { View } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const CIRCUMFERENCE = 200;
const R = CIRCUMFERENCE / (2 * Math.PI);
const STROKE_WIDTH = 5;
const HALF_CIRCLE = R + STROKE_WIDTH;
const DIAMETER = 2 * HALF_CIRCLE;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const LoadingSpinner = () => {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value)
  }), []);

  const animatedViewStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }), []);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.1, { duration: 2000 })
      ),
      -1,
      true
    );

    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={animatedViewStyle}>
        <Svg width={DIAMETER} height={DIAMETER} viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
          <G origin={`${HALF_CIRCLE}, ${HALF_CIRCLE}`} rotation="-90">
            <AnimatedCircle
              animatedProps={animatedCircleProps}
              cx="50%"
              cy="50%"
              fill="transparent"
              r={R}
              stroke="blue"
              strokeDasharray={CIRCUMFERENCE}
              strokeWidth={STROKE_WIDTH}
            />
          </G>
        </Svg>
      </Animated.View>
    </View>
  )
}
