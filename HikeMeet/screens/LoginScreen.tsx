import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// הגדרת הסוג של מחסנית הניווט
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

// מסך ההתחברות (Login)
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
