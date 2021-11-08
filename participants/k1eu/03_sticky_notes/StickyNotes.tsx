import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import StickyNoteItem from "./components/StickyNoteItem";
import styles from "./styles";

const initialNotes = [
  {
    id: 1,
    title: "Note 1",
  },
  {
    id: 2,
    title: "Note 2",
  },
  {
    id: 3,
    title: "Note 3",
  },
  {
    id: 4,
    title: "Note 4",
  },
];

const StickyNotes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const currentZIndex = useSharedValue(initialNotes.length);

  const getNewZIndex = () => {
    "worklet";
    currentZIndex.value += 1;
    return currentZIndex.value;
  };

  const addNote = () => {
    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        title: `Note ${notes.length + 1}`,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteDispenser}>
        {notes.map((note, index) => (
          <StickyNoteItem
            key={note.id}
            index={index}
            label={note.title}
            getNewZIndex={getNewZIndex}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={addNote}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StickyNotes;
