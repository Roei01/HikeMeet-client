import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* תמונת פרופיל */}
      <Image
        source={require('../assets/profile.jpg')} // עדכון לשימוש בתמונה מקומית
        style={styles.profileImage}
      />

      {/* פרטי המשתמש */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.location}>New York, USA</Text>
      <Text style={styles.bio}>
        A passionate traveler who loves exploring new places and meeting new people.
      </Text>

      {/* סטטיסטיקות המטייל */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>102</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* כפתורים לפעולות נוספות */}
      <View style={styles.buttonContainer}>
        <Button title="Edit Profile" onPress={() => alert('Edit Profile')} color="#1E90FF" />
        <Button title="My Trips" onPress={() => alert('My Trips')} color="#FF6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ProfileScreen;
