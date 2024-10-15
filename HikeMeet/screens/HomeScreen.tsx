import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// הגדרת הסוג של פרמטרי הניווט
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
      source={require('../assets/background.jpg')} // תוודא שהתמונה שלך נמצאת בתיקיית assets
      style={styles.background}
      resizeMode="cover"
    >
      {/* שכבת שקיפות מעל תמונת הרקע */}
      <View style={styles.overlay} />

      {/* אזור תמונת הפרופיל בעיגול */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile.jpg')} // תוודא שתמונת הפרופיל שלך נמצאת בתיקיית assets
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
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
          onPress={() => navigation.navigate('SearchByArea')}
        >
          <Text style={styles.buttonText}>Search By Area</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // שכבת שקיפות כהה על כל המסך (50% שקוף)
  },
  profileContainer: {
    position: 'absolute',
    top: 40, // מיקום התמונה בצד ימין למעלה
    right: 20, // מיקום התמונה בצד ימין למעלה
  },
  profileImage: {
    width: 50, // גודל התמונה
    height: 50, // גודל התמונה
    borderRadius: 25, // כדי ליצור עיגול לתמונה
    borderWidth: 2, // מסגרת מסביב לתמונה
    borderColor: '#fff', // צבע המסגרת לבן
  },
  content: {
    flex: 1,
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
