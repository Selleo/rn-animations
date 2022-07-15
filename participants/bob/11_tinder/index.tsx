import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Card from "./Card";

const people = [
  {
    name: "Anna",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5vvwt0olpOyCklgO8g6GegRxhGqHJIp0Ow&usqp=CAU",
  },
  {
    name: "Jola",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8R-hhGeubGV2H_LjbNr1PSN18TQiUa49pQ&usqp=CAU",
  },
  {
    name: "Magda",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVy-7N2hfUN0oea0a0WPEf0mkhlSKUt4C8A&usqp=CAU",
  },
  {
    name: "Jadzia",
    url: "https://i.imgur.com/QaHys5c_d.webp?maxwidth=760&fidelity=grand",
  },
];

export const Tinder = () => {
  const [stack, setStack] = useState(people);

  const removeNode = (name: string) => () => {
    setStack((prev) => prev.filter((person) => person.name !== name));
  };

  return (
    <View style={styles.content}>
      {stack.map((singlePerson) => (
        <Card person={singlePerson} onChoose={removeNode(singlePerson.name)} />
      ))}
    </View>
  );
};

export default Tinder;

const styles = StyleSheet.create({
  content: {
    marginTop: 150,
    marginHorizontal: 30,
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 100,
  },
});
