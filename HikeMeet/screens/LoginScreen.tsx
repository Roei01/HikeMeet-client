import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // הוסף את axios לביצוע בקשות לשרת
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState(''); // אחסון שם המשתמש
  const [password, setPassword] = useState(''); // אחסון הסיסמה

  // פונקציה לטיפול באירוע התחברות
  const handleLogin = async () => {
    // אם לא הוכנסו שם משתמש או סיסמה, מציגים הודעת שגיאה
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      // קריאה לשרת דרך axios לכתובת ה-API
      const response = await axios.post('http://172.20.10.4:3000/api/login', {
        username,
        password,
      });

      // בדיקה אם ההתחברות הצליחה
      if (response.data.success) {
        Alert.alert('Success', 'Login successful!'); // הודעת הצלחה
        navigation.navigate('Home'); // הפניה לדף הבית אם ההתחברות הצליחה
      } else {
        // במידה וההתחברות נכשלה, הצגת הודעת השגיאה שהתקבלה מהשרת
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      // טיפול בשגיאות כמו בעיות חיבור לשרת או שגיאות אחרות
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* כותרת דף ההתחברות */}
      <Text style={styles.title}>Login</Text>

      {/* שדה להזנת שם המשתמש */}
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      {/* שדה להזנת הסיסמה */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry // שדה הסיסמה יהיה מוסתר
      />

      {/* כפתור ההתחברות */}
      <Button title="Login" onPress={handleLogin} />

      {/* קישור לדף ההרשמה במידה ואין חשבון */}
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
