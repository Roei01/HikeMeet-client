import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileImage from '../components/ProfileImage';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  SearchByArea: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/maps.jpg')} // עדכון התמונה כאן
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.contentContainer}>
        {/* אזור תמונת הפרופיל */}
        <View style={styles.headerContainer}>
          <ProfileImage navigation={navigation} />
          <Text style={styles.greetingText}>Explore</Text>
        </View>


        {/* כרטיס האטרקציה */}
        <TouchableOpacity onPress={() => navigation.navigate('SearchByArea')}>
        <View style={styles.exploreCard}>
          <Image
            source={require('../assets/cenote.jpg')} // מסלול התמונה המקומית
            style={styles.attractionImage}
          />
          <View style={styles.attractionDetails}>
            <Text style={styles.attractionTitle}>Hallstatt</Text>
            <Text style={styles.distanceText}>12.5 km away</Text>
            <View style={styles.reviewsContainer}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewerImage} />
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewerImage} />
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.reviewerImage} />
              <Text style={styles.reviewsText}>48 Travel Bloggers reviewed this place</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>

        {/* כפתור Start */}
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        {/* ניווט */}
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.navIcon}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navIcon}>📅</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  exploreCard: {
    backgroundColor: '#8ea4ab',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  attractionImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  attractionDetails: {
    padding: 15,
  },
  attractionTitle: {

    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  reviewsText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 10,
  },
  startButton: {
    backgroundColor: '#b0abab',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    width: 2,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#1c1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 140,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default HomeScreen;
