import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TrainerContext } from '../context/TrainerContextProvider';
export default function Calanders() {
  const [openNewTraining] =useContext(TrainerContext);
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const [price, setPrice] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  const showPicker = (pickerMode: 'date' | 'time') => {
    setMode(pickerMode);
    setShow(true);
  };

  const handleSubmit = () => {
    if (!date || !name || !price) {
      Alert.alert('Error', 'Please fill out all fields to continue.');
      return;
    }

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const trainingSchedule = {
      name,
      date: formattedDate,
      time: formattedTime,
      price: parseFloat(price),
    };

    console.log('Training Schedule:', trainingSchedule);
    openNewTraining(trainingSchedule);
    Alert.alert('Success', 'Training schedule added successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.texthead}>Choose When You Want To Work</Text>
      <Image source={require('../assets/2.png')} style={styles.mainImage} />

      <View style={styles.container}>
        {/* Date Input */}
        <TouchableOpacity style={styles.inputButton} onPress={() => showPicker('date')}>
          <Text style={styles.inputButtonText}>
            {date ? date.toLocaleDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>

        {/* Show DateTimePicker if active */}
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display="default"
            is24Hour={true}
            onChange={onChange}
          />
        )}

        {/* Time Input */}
        <TouchableOpacity style={styles.inputButton} onPress={() => showPicker('time')}>
          <Text style={styles.inputButtonText}>
            {date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'Select Time'}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter Training Name"
          value={name || ''}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          value={price || ''}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />

        <Button title="Add Training" onPress={handleSubmit} color="#1DBD7B" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  texthead: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainImage: {
    height: 300,
    width: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  inputButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  inputButtonText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  selectedText: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
