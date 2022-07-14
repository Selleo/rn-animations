import { View, Text } from "react-native";
import React from "react";
import Card from "./Card";

const list = [
  {
    name: "Maleństwo",
    age: 20,
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreirFdi2i_e3dZzqTb2qb8xlliyM3XZWWuw&usqp=CAU",
  },
  {
    name: "Kubus Puchatek",
    age: 20,
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDIE4DAVd7xp3HbpH0gq-E4UVgss4IGqcraQ&usqp=CAU",
  },
  {
    name: "Prosiaczek",
    age: 20,
    picture: "https://tygrysek83.files.wordpress.com/2010/12/prosiaczek.jpg",
  },
  {
    name: "Tygrysek",
    age: 20,
    picture:
      "https://a.allegroimg.com/s512/037f0f/33c41b5143b8a64097f7f917b1b3/NAKLEJKA-NA-OKNO-LUSTRO-MEBLE-SZYBE-TYGRYSEK",
  },
  {
    name: "Kłapouchy",
    age: 20,
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzll5CWOipJFPWuvK7NE-Y1D7sbrhLUwAjw&usqp=CAU",
  },
];

const TinderSwipe = () => {
  return (
    <>
      {list.map((item, index) => (
        <Card
          name={item.name}
          age={item.age}
          image={item.picture}
          key={index}
        />
      ))}
    </>
  );
};

export default TinderSwipe;
