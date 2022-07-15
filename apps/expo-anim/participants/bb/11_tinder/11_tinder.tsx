import React, { useEffect, useState } from "react";
import { View } from "react-native";

import TinderCard from "./TinderCard";
import { Card } from "./TinderCard/TinderCard";

const TinderCards = () => {
  const [tinderCards, setTinderCards] = useState(cards);

  const handleRemove = (id: Card["id"]) => {
    setTinderCards((oldTinderCards) => {
      return oldTinderCards.filter((card) => card.id !== id);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a35",
      }}
    >
      {tinderCards.map((card) => (
        <TinderCard
          image={card.image}
          key={card.name}
          name={card.name}
          age={card.age}
          id={card.id}
          onRemove={handleRemove}
        />
      ))}
    </View>
  );
};

export default TinderCards;

const image1 = require("./assets/1.png");
const image2 = require("./assets/2.png");
const image3 = require("./assets/3.png");
const image4 = require("./assets/4.png");
const image5 = require("./assets/5.png");
const image6 = require("./assets/6.png");
const image7 = require("./assets/7.png");
const image8 = require("./assets/8.png");
const image9 = require("./assets/9.png");
const image10 = require("./assets/10.png");
const image11 = require("./assets/11.png");

const cards: Card[] = [
  {
    name: "Jane",
    age: "25",
    image: image1,
    id: 1,
  },
  {
    name: "Olivia",
    age: "26",
    image: image2,
    id: 2,
  },
  {
    name: "Marry",
    age: "27",
    image: image3,
    id: 3,
  },
  {
    name: "Aurora",
    age: "28",
    image: image4,
    id: 4,
  },
  {
    name: "Damian <3",
    age: "28",
    image: image5,
    id: 5,
  },
  {
    name: "Ophelia",
    age: "30",
    image: image6,
    id: 6,
  },
  {
    name: "Eleanor",
    age: "31",
    image: image7,
    id: 7,
  },
  {
    name: "Eloise",
    age: "32",
    image: image8,
    id: 8,
  },
  {
    name: "Maeve",
    age: "33",
    image: image9,
    id: 9,
  },
  {
    name: "Lena",
    age: "34",
    image: image10,
    id: 10,
  },
  {
    name: "Aurelia",
    age: "35",
    image: image11,
    id: 11,
  },
];
