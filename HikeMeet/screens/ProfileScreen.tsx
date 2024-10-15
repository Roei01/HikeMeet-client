import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // אחסון הטוקן

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // פונקציה למשוך את פרטי המשתמש
  const fetchProfileData = async () => {
    try {
      // משוך את הטוקן מ-AsyncStorage
      const token = await AsyncStorage.getItem('jwtToken');
      console.log('Token:', token); // הדפסה לבדיקה אם הטוקן אכן נשלף

      if (!token) {
        Alert.alert('Error', 'Token not found, please login again');
        return;
      }

      // קריאה לשרת עם הטוקן
      const response = await axios.get('http://172.20.10.4:3000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Profile data response:', response.data); // הדפסת התגובה מהשרת

      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  // קריאה לפונקציה לאחר שהרכיב נטען
  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* תמונת פרופיל */}
      <Image
        source={{ uri: profileData.profileImageUrl }} // שימוש בתמונה מהשרת
        style={styles.profileImage}
      />

      {/* פרטי המשתמש */}
      <Text style={styles.name}>{profileData.firstName}</Text>
      <Text style={styles.location}>{profileData.location}</Text>
      <Text style={styles.bio}>{profileData.bio}</Text>

      {/* סטטיסטיקות המשתמש */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profileData.trips}</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profileData.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profileData.reviews}</Text>
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
