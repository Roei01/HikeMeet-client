import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, onClearFilter }) => {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.clearButton} onPress={onClearFilter}>
        <Text style={styles.clearButtonText}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'nowrap', // הגדרת גלילה אופקית
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 8,
    backgroundColor: 'transparent', // כפתור לא נבחר
  },
  selectedCategoryButton: {
    backgroundColor: '#1E90FF', // צבע רקע כחול לכפתור הנבחר
    borderColor: '#1E90FF', // צבע המסגרת של הכפתור הנבחר
  },
  categoryButtonText: {
    color: '#8e8e8e', // צבע טקסט לכפתור לא נבחר
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff', // צבע טקסט לכפתור נבחר
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    backgroundColor: 'transparent', // כפתור שקוף
    borderWidth: 1,
    borderColor: '#FF6347', // צבע המסגרת של כפתור Clear
  },
  clearButtonText: {
    color: '#FF6347',
    fontWeight: '600',
  },
});

export default CategoryFilter;
