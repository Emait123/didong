import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput, View, Text, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const saveNote = async () => {
    if (newNote.trim() === '') {
      Alert.alert('Error', 'Ghi chú không được rỗng!');
      return;
    }

    const note = {
      id: Date.now().toString(),
      text: newNote,
    };

    try {
      await AsyncStorage.setItem(note.id, JSON.stringify(note));
      setNotes([...notes, note]);
      setNewNote('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const savedNotes = await AsyncStorage.multiGet(keys);
      const notes = savedNotes.map((note) => JSON.parse(note[1]));
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      // onPress={() => navigation.navigate('Note', { id: item.id })}
    >
      <Text>{item.text}</Text>
      <Pressable onPress={() => deleteNote(item.id)}>
        <Text>Delete</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'plum', padding: 60 }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập ghi chú"
          value={newNote}
          onChangeText={setNewNote}
        />
        <Pressable style={styles.addButton} onPress={saveNote}>
          <Text>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});
