import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ספריית אייקונים

const AttractionItem = ({ item, onPress, onGiveReview }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.name, item.latitude, item.longitude)} style={styles.card}>
      <Image source={{ uri: item.photoUrl }} style={styles.attractionImage} />
      
      <View style={styles.textOverlay}>
        <Text style={styles.attractionName}>{item.name}</Text>

        {/* דירוג עם כוכבים */}
        <View style={styles.ratingContainer}>
          {[...Array(Math.round(item.rating))].map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#FFD700" />
          ))}
          {[...Array(5 - Math.round(item.rating))].map((_, i) => (
            <Ionicons key={i} name="star-outline" size={16} color="#FFD700" />
          ))}
          <Text style={styles.ratingText}>{item.rating} ({item.ratingCount} reviews)</Text>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="white" />
          <Text style={styles.distanceText}>2 km away</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.reviewButton} onPress={onGiveReview}>
        <Text style={styles.reviewButtonText}>Give Review</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3, // הצללה על אנדרואיד
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  attractionImage: {
    width: '100%',
    height: 150,
  },
  textOverlay: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  attractionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distanceText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  reviewButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0057e7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AttractionItem;
