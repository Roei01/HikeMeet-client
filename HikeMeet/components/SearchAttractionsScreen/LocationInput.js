import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // ספריית האייקונים

const LocationInput = ({ location, onChangeLocation }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name="search-outline" size={18} color="#8e8e8e" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={location}
        onChangeText={onChangeLocation}
        placeholderTextColor="#8e8e8e"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 10,
    borderRadius: 50, // עיגול שלם לשדה הקלט
    backgroundColor: '#f4f4f4', // צבע רקע רך
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // אפקט הצללה קל
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
});

export default LocationInput;
