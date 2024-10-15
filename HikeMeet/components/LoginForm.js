import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, styles }) => {
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
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;
