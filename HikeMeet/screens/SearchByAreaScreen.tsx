import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import * as Location from 'expo-location';
import CategoryFilter from '../components/SearchAttractionsScreen/CategoryFilter';
import SortButton from '../components/SearchAttractionsScreen/SortButton';
import AttractionItem from '../components/SearchAttractionsScreen/AttractionItem';
import LocationInput from '../components/SearchAttractionsScreen/LocationInput';
import { fetchAttractions } from '../services/googlemaps';

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
  const [attractions, setAttractions] = useState<Attraction[]>([]); // הגדרת הסוג כ-Attraction[]
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

  const handleFetchAttractions = async () => {
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    setLoading(true);

    try {
      const apiKey = 'AIzaSyAqkAoPnQoiXechdKGAyT2ba_lvNb1uddw'; // מפתח ה-API שלך
      const categoryQuery = selectedCategory || 'attractions';
      const results = await fetchAttractions(location, categoryQuery);
      const newAttractions: Attraction[] = results.map((place: any) => ({
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
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${lat},${lng}&destination_place_id=${name}&travelmode=driving`;

    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const sortedAttractions = sortByRating
    ? [...attractions].sort((a, b) => b.rating - a.rating) // הבטחת הסוג Attraction[] מונעת את השגיאה
    : attractions;

  function handleGiveReview(id: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Attractions</Text>

      <LocationInput location={location} onChangeLocation={setLocation} />

      <Button title="Search" onPress={handleFetchAttractions} color="#1E90FF" />

      {loading && <ActivityIndicator size="large" color="#1E90FF" style={{ marginTop: 20 }} />}

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onClearFilter={() => setSelectedCategory(null)}
      />

      <SortButton sortByRating={sortByRating} onToggleSort={() => setSortByRating(!sortByRating)} />

      <FlatList
        data={sortedAttractions}
        keyExtractor={(item) => item.id} // הגדרת הסוג נכונה עבור keyExtractor
        renderItem={({ item }) => (
        <AttractionItem item={item} onPress={openInGoogleMaps} onGiveReview={() => handleGiveReview(item.id)} // או כל פונקציה אחרת שמתאימה למתן ביקורת
        />
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
    marginTop: 46,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E90FF',
    textAlign: 'center',
  },
});

export default SearchAttractionsScreen;
