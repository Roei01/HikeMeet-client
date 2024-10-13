import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// הגדרת הסוג של פרמטרי הניווט
type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // תוודא שהתמונה שלך נמצאת בתיקיית assets
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to HikeMeet!</Text>
        
        {/* כפתור 1 - חיפוש טיולים */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>Search for Trips</Text>
        </TouchableOpacity>

        {/* כפתור 2 - פרופיל */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF6347' }]} // רקע בצבע שונה עבור הכפתור השני
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width, // גודל התמונה יימתח על כל הרוחב של המסך
    height: Dimensions.get('window').height, // גודל התמונה יימתח על כל הגובה של המסך
    justifyContent: 'center', // המרכזת את התוכן על הציר האנכי
    alignItems: 'center', // המרכזת את התוכן על הציר האופקי
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // שכבת שקיפות עדינה יותר (30%)
    padding: 20,
    borderRadius: 10, // פינות מעוגלות כדי ליצור מראה אסתטי
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // צבע לבן לכותרת על הרקע
    marginBottom: 30,
    textAlign: 'center', // ממרכז את הטקסט
  },
  button: {
    backgroundColor: '#1E90FF', // צבע רקע כחול לכפתור
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25, // פינות מעוגלות
    marginBottom: 15, // רווח בין הכפתורים
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // אפקט הצללה לכפתור
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // צבע טקסט לבן לכפתור
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
