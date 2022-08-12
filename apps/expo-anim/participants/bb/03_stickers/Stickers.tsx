import React, { FC, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ScrollView, View } from "react-native";

import styles from "./styles";

import Sticker from "./Sticker";

type Props = {};

const STICKERS = [
  { id: 1, source: require("./assets/1.png") },
  {
    id: 2,
    source: require("./assets/2.png"),
  },
  { id: 3, source: require("./assets/3.png") },
  { id: 4, source: require("./assets/2.png") },
  {
    id: 5,
    source: require("./assets/1.png"),
  },
  { id: 6, source: require("./assets/1.png") },
  { id: 7, source: require("./assets/3.png") },
  {
    id: 8,
    source: require("./assets/2.png"),
  },
  { id: 9, source: require("./assets/3.png") },
  { id: 10, source: require("./assets/2.png") },
  {
    id: 11,
    source: require("./assets/1.png"),
  },
  { id: 12, source: require("./assets/2.png") },
];

const Stickers: FC<Props> = () => {
  const lastZIndex = useSharedValue(0);
  const [stickers, setStickers] = useState(STICKERS);

  const renderStickers = useMemo(() => {
    return stickers.map((sticker, index) => (
      <Sticker
        imageIndex={index}
        key={sticker?.id}
        lastZIndex={lastZIndex}
        {...sticker}
      />
    ));
  }, [stickers]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>{renderStickers}</View>
    </View>
  );
};

export default Stickers;
