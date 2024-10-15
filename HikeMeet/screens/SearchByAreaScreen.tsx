import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

type Attraction = {
  id: string;
  name: string;
  photoUrl: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
};

const SearchAttractionsScreen: React.FC = () => {
  const [location, setLocation] = useState('');
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortByRating, setSortByRating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);

  const categories = ['בתי חב"ד', 'פארקי אטרקציות', 'סנוטות', 'מרכזי קניות', 'חופים'];

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    };

    fetchCurrentLocation();
  }, []);

  const getGoogleMapsQuery = (category: string | null): string => {
    switch (category) {
      case 'בתי חב"ד':
        return 'Chabad houses';
      case 'פארקי אטרקציות':
        return 'Amusement park';
      case 'סנוטות':
        return 'Sonata';
      case 'מרכזי קניות':
        return 'shopping centers';
      case 'חופים':
        return 'beach';
      default:
        return 'attractions';
    }
  };

  const fetchAttractions = async () => {
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    setLoading(true);

    try {
      const apiKey = 'AIzaSyAqkAoPnQoiXechdKGAyT2ba_lvNb1uddw'; // מפתח ה-API שלך
      const categoryQuery = getGoogleMapsQuery(selectedCategory);
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${categoryQuery}+in+${location}&key=${apiKey}`
      );

      if (data.results.length === 0) {
        alert('No attractions found for this location.');
        setAttractions([]);
      } else {
        const newAttractions = data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          photoUrl: place.photos && place.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
            : 'https://example.com/default-image.jpg',
          category: selectedCategory || 'General',
          rating: place.rating || 0,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }));
        setAttractions(newAttractions);
      }
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }

    setLoading(false);
  };

  const openInGoogleMaps = (name: string, lat: number, lng: number) => {
    if (!currentLocation) {
      alert('Current location not found.');
      return;
    }

    const { lat: currentLat, lng: currentLng } = currentLocation;

    // קישור לפתיחת Google Maps עם מיקום נוכחי ונקודת יעד
    const url = Platform.select({
      ios: `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${lat},${lng}&destination_place_id=${name}&travelmode=driving`, // ב-iOS ייפתח דרך Apple Maps
      android: `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${lat},${lng}&destination_place_id=${name}&travelmode=driving`, // ב-Android ייפתח דרך Google Maps
    });

    Linking.openURL(url!).catch(err => console.error("Couldn't load page", err));
  };

  const filteredAttractions = attractions;
  const sortedAttractions = sortByRating
    ? [...filteredAttractions].sort((a, b) => b.rating - a.rating)
    : filteredAttractions;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Attractions</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Search" onPress={fetchAttractions} color="#1E90FF" />

      {loading && <ActivityIndicator size="large" color="#1E90FF" style={{ marginTop: 20 }} />}

      {/* כפתורי סינון לפי קטגוריות */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
        {/* אפשרות להסיר את הסינון */}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={styles.clearButtonText}>Clear Filter</Text>
        </TouchableOpacity>
      </View>

      {/* כפתור למיון לפי דירוג */}
      <TouchableOpacity
        style={[styles.sortButton, sortByRating && { backgroundColor: '#FF6347' }]}
        onPress={() => setSortByRating(!sortByRating)}
      >
        <Text style={styles.sortButtonText}>
          {sortByRating ? 'Sort by Default' : 'Sort by Rating'}
        </Text>
      </TouchableOpacity>

      {/* רשימת אטרקציות */}
      <FlatList
        data={sortedAttractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openInGoogleMaps(item.name, item.latitude, item.longitude)}>
            <View style={styles.attractionItem}>
              <Image source={{ uri: item.photoUrl }} style={styles.attractionImage} />
              <View style={styles.attractionTextContainer}>
                <Text style={styles.attractionName}>{item.name}</Text>
                <Text style={styles.attractionCategory}>{item.category}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>Rating: {item.rating}</Text>
                  <View style={styles.starsContainer}>
                    {[...Array(Math.round(item.rating))].map((_, i) => (
                      <Text key={i} style={styles.star}>★</Text>
                    ))}
                    {[...Array(5 - Math.round(item.rating))].map((_, i) => (
                      <Text key={i} style={styles.starGray}>★</Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No attractions found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    marginTop:46,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E90FF',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#FF6347',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sortButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  attractionItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  attractionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  attractionTextContainer: {
    flex: 1,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  attractionCategory: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    marginRight: 2,
  },
  starGray: {
    color: '#d3d3d3',
    marginRight: 2,
  },
});

export default SearchAttractionsScreen;
