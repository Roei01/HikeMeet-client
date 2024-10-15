import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SortButton = ({ sortByRating, onToggleSort }) => {
  return (
    <TouchableOpacity
      style={[styles.sortButton, sortByRating && { backgroundColor: '#FF6347' }]}
      onPress={onToggleSort}
    >
      <Text style={styles.sortButtonText}>
        {sortByRating ? 'Sort by Default' : 'Sort by Rating'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sortButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SortButton;
