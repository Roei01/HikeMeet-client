// screens/ReviewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traveler Reviews and Ratings</Text>
      {/* בהמשך נוסיף כאן רשימה של דירוגים */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
  },
});

export default ReviewScreen;
