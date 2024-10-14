import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // או כל קובץ שמכיל את הניווט שלך


type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60); // טיימר לקוד
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/api/request-verification', { username, email, password });
      if (response.data.success) {
        Alert.alert('Success', 'Verification code sent to your email');
        setIsVerifying(true);
        startTimer(); // הפעלת טיימר
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/api/verify-code', { email, code: verificationCode });
      if (response.data.success) {
        Alert.alert('Success', 'Account verified and created!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Verification failed, please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post('http://172.20.10.4:3000/api/resend-code', { email });
      if (response.data.success) {
        Alert.alert('Success', 'New verification code sent');
        startTimer();
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to resend code');
    }
  };

  // הפעלת טיימר למשך 60 שניות
  const startTimer = () => {
    setIsResendAllowed(false);
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsResendAllowed(true); // אפשרות לשלוח שוב קוד
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      {!isVerifying ? (
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
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Already have an account? <Text style={styles.linkText}>Login here</Text>
          </Text>

        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter Verification Code"
            style={styles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            placeholderTextColor="#aaa"
          />
          <Text style={styles.timerText}>
            {timer > 0 ? `You can resend the code in ${timer} seconds` : 'You can resend the code now'}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.button, isResendAllowed ? null : styles.disabledButton]}
            onPress={handleResendCode}
            disabled={!isResendAllowed}
          >
            <Text style={styles.buttonText}>Resend Code</Text>
            
          </TouchableOpacity>
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Already have an account? <Text style={styles.linkText}>Login here</Text>
          </Text>

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
  linkText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },

});

export default SignUpScreen;
