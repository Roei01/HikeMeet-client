import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

const SignUpForm = ({ username, email, password, setUsername, setEmail, setPassword, handleSignUp, styles }) => {
  return (
    <>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignUpForm;
