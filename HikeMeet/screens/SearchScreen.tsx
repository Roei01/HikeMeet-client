import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, Dimensions, ActivityIndicator, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const API_KEY = 'AIzaSyAqkAoPnQoiXechdKGAyT2ba_lvNb1uddw'; // תחליף במפתח ה-API שלך

type Place = {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

const SearchScreen = () => {
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // האנימציה של התוצאות

  const searchTrips = async () => {
    if (location) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=${API_KEY}`
        );
        setPlaces(response.data.results);
        setLoading(false);
        // הפעלת האנימציה של התוצאות כאשר התוצאות נמצאות
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handlePlacePress = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Trips</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Search" onPress={searchTrips} color="#1E90FF" />

      {/* הצגת אנימציית טעינה בזמן חיפוש */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {/* הצגת תוצאות החיפוש עם אפקט אנימציה */}
      {!loading && places.length > 0 && (
        <Animated.View style={{ ...styles.resultContainer, opacity: fadeAnim }}>
          <FlatList
            data={places}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <View style={styles.placeContainer}>
                <Text style={styles.placeName} onPress={() => handlePlacePress(item.geometry.location.lat, item.geometry.location.lng)}>
                  {item.name}
                </Text>
                <Text style={styles.placeAddress}>{item.formatted_address}</Text>
              </View>
            )}
          />
        </Animated.View>
      )}

      {/* הצגת המפה */}
      <MapView
        style={styles.map}
        region={{
          latitude: selectedLocation ? selectedLocation.lat : 37.78825,
          longitude: selectedLocation ? selectedLocation.lng : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            title="Selected Location"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E90FF',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
  },
  placeContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeAddress: {
    fontSize: 14,
    color: '#777',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SearchScreen;
