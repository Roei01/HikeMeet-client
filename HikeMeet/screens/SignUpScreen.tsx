import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

// הגדרת הסוג של מחסנית הניווט
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

// מסך ההרשמה (SignUp)
type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSignUp = async () => {
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters, contain a number and an uppercase letter');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
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
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login here
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

export default SignUpScreen;
