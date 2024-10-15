import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileImage from '../components/ProfileImage';
import CustomButton from '../components/CustomButton';

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
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* אזור תמונת הפרופיל */}
      <View style={styles.profileContainer}>
        <ProfileImage navigation={navigation} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to HikeMeet!</Text>

        {/* כפתור 1 - חיפוש טיולים */}
        <CustomButton
          title="Search for Trips"
          onPress={() => navigation.navigate('Search')}
        />

        {/* כפתור 2 - חיפוש לפי אזור */}
        <CustomButton
          title="Search By Area"
          backgroundColor="#FF6347"
          onPress={() => navigation.navigate('SearchByArea')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default HomeScreen;
