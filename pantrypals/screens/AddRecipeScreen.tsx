import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExampleScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Desserts" value="Desserts" />
        <Picker.Item label="Snacks" value="Snacks" />
        <Picker.Item label="Beverages" value="Beverages" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ExampleScreen;
