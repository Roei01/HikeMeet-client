// screens/ChatScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with Fellow Travelers</Text>
      {/* בהמשך נוסיף כאן יכולות צ'אט אמיתיות */}
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

export default ChatScreen;
