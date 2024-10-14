import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, Dimensions, ActivityIndicator, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SearchScreen = () => {
  const [location, setLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // אנימציה לתוצאות

  // 4 מיקומים בתל אביב
  const telAvivLocations = [
    { id: '1', name: 'Yossi', latitude: 32.0623, longitude: 34.7798 },
    { id: '2', name: 'Roei', latitude: 32.0637, longitude: 34.7833 },
    { id: '3', name: 'Avi', latitude: 32.0651, longitude: 34.7868 },
    { id: '4', name: 'Lior', latitude: 32.0671, longitude: 34.7903 },
  ];

  // לחיצה על מקום מסומן במפה
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
      <Button title="Search" onPress={() => {}} color="#1E90FF" />

      {/* הצגת המפה */}
      <MapView
        style={styles.map}
        region={{
          latitude: selectedLocation ? selectedLocation.lat : 32.0623,
          longitude: selectedLocation ? selectedLocation.lng : 34.7798,
          latitudeDelta: 0.039,
          longitudeDelta: 0.0221,
        }}
      >
        {telAvivLocations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
          >
            {/* עיגול מותאם אישית שמדמה פרופיל */}
            <View style={styles.customMarker}>
              <Image
                source={require('../assets/profile.jpg')} // תוודא שתמונה זו קיימת
                style={styles.markerImage}
              />
              <Text style={styles.markerText}>{loc.name}</Text>
            </View>
          </Marker>
        ))}
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
    marginTop: 40,
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
  map: {
    width: Dimensions.get('window').width,
    height: 450,
    marginTop: 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  customMarker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
    borderRadius: 5,
  },
});

export default SearchScreen;
