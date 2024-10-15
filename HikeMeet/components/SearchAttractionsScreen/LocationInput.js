import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const LocationInput = ({ location, onChangeLocation }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter a location"
      value={location}
      onChangeText={onChangeLocation}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default LocationInput;
