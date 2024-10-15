import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {/* אזור תמונת הפרופיל */}
        <View style={styles.headerContainer}>
          <ProfileImage navigation={navigation} />
          <Text style={styles.greetingText}>Hi, Welcome to HikeMeet!</Text>
        </View>

        {/* אזור חיפוש */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Search for Trips</Text>
        </View>

        {/* קטגוריות */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryRow}>
            <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('Search')}>
              <Text style={styles.categoryTitle}>Search for Trips</Text>
              <Text style={styles.categoryTaskCount}>Find amazing trips!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#d1e7dd' }]} onPress={() => navigation.navigate('SearchByArea')}>
              <Text style={styles.categoryTitle}>Search By Area</Text>
              <Text style={styles.categoryTaskCount}>Explore by location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* כפתורים נוספים */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchText: {
    fontSize: 18,
    color: '#888',
    marginLeft: 10,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 20,
    backgroundColor: '#fbe7c6',
    borderRadius: 15,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryTaskCount: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
});

export default HomeScreen;
