import React, { useState } from "react";
import Sticker from "./Sticker";
import { View, Text } from "react-native";
import Sticker1 from "./sticker1";
import Sticker2 from "./sticker2";
import Sticker3 from "./sticker3";
import Sticker4 from "./sticker4";
import Sticker5 from "./sticker5";

const Stickers = () => {
  const [_maxZindex, setMaxZindex] = useState(5);

  const [zIndexes, setZindexes] = useState([0, 1, 2, 3, 4]);

  const increaseZindexFor = (number: number) => () => {
    setMaxZindex((prev) => {
      const next = prev + 1;
      const copy = [...zIndexes];
      copy[number] = next;
      setZindexes(copy);
      return next;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Sticker
        increaseZindex={increaseZindexFor(0)}
        zIndex={zIndexes[0]}
        initialX={20}
      >
        <Sticker1 />
      </Sticker>
      <Sticker
        increaseZindex={increaseZindexFor(1)}
        zIndex={zIndexes[1]}
        initialX={60}
      >
        <Sticker2 />
      </Sticker>
      <Sticker
        increaseZindex={increaseZindexFor(2)}
        zIndex={zIndexes[2]}
        initialX={60}
      >
        <Sticker3 />
      </Sticker>
      <Sticker
        increaseZindex={increaseZindexFor(3)}
        zIndex={zIndexes[3]}
        initialX={60}
      >
        <Sticker4 />
      </Sticker>
      <Sticker
        increaseZindex={increaseZindexFor(4)}
        zIndex={zIndexes[4]}
        initialX={60}
      >
        <Sticker5 />
      </Sticker>
    </View>
  );
};

export default Stickers;
