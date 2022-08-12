import React, { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import {
  Canvas,
  Circle,
  Fill,
  Paint,
  useFont,
  useTouchHandler,
  mix,
  useSharedValueEffect,
  useValue,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const colors = ["lightblue", "green", "black", "blue", "red", "lime", "pink"];

const a = Array.from({ length: 2 });

const SkitaTest = () => {
  const cx = useValue(100);
  const cy = useValue(100);

  const x = useValue(0);
  const y = useValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    x.current = mix(progress.value, width / 2, width / 2 + 100);
    y.current = mix(progress.value, height / 4, height / 4 + 100);
  }, progress); // you can pass other shared values as extra parameters

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      if (
        x > cx.current - r &&
        x < cx.current + r &&
        y > cy.current - r &&
        y < cy.current + r
      ) {
        cx.current = x;
        cy.current = y;
      }
    },
  });

  const strokeWidth = 50;
  const r = 80;

  const { width, height } = useWindowDimensions();

  const font = useFont(require("@assets/fonts/Roboto-Regular.ttf"), 12);
  if (font === null) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
        <>
          <Fill color={"white"} />
          {a.map((_, indexA) => (
            <Circle key={indexA} cx={x} cy={y} r={r} color="black">
              <Paint color="yellow" strokeWidth={strokeWidth} />
              {colors.map((color, index) => (
                <Paint
                  key={color}
                  color={color}
                  style="stroke"
                  strokeWidth={strokeWidth - index * 10}
                />
              ))}
            </Circle>
          ))}
          <Circle cx={cx} cy={cy} r={r} color="black">
            <Paint color="magenta" strokeWidth={strokeWidth} />
          </Circle>
        </>
      </Canvas>
    </View>
  );
};

export default SkitaTest;

const styles = StyleSheet.create({});
