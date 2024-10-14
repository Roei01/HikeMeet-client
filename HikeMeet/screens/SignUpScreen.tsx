import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // הוסף את axios
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // עדכון לפי קובץ ה-TypeScript שלך

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // נוודא שהכתובת נכונה, עם ה-IP של השרת שלנו
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/api/register', {
        username,
        email,
        password,
      });

      // בדיקה אם ההרשמה הצליחה
      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login'); // מעבר לדף ההתחברות
      } else {
        Alert.alert('Error', response.data.message); // הצגת שגיאה מהשרת
      }
    } catch (error) {
      // בדיקת שגיאה נוספת
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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
});

export default SignUpScreen;
