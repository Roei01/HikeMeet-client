import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// ייבוא המסכים שיצרת
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import ReviewScreen from './screens/ReviewScreen';
import LoginScreen from './screens/LoginScreen'; // הוספת מסך התחברות
import SignUpScreen from './screens/SignUpScreen'; // הוספת מסך הרשמה

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Chat: undefined;
  Review: undefined;
  Login: undefined;   // מסך ההתחברות
  SignUp: undefined;   // מסך ההרשמה
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"  // הגדרת מסך ה-Login כדף הראשון
        screenOptions={{
          headerShown: false, // הסרת הכותרות מכל המסכים
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
