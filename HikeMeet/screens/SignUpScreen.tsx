import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import SignUpForm from '../components/SignUpForm';
import VerificationForm from '../components/VerificationForm';
import { requestVerificationCode, verifyCode, resendVerificationCode } from '../services/register';

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
  const [timer, setTimer] = useState(60);
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await requestVerificationCode(username, email, password);
      if (response.success) {
        Alert.alert('Success', 'Verification code sent to your email');
        setIsVerifying(true);
        startTimer();
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, verificationCode);
      if (response.success) {
        Alert.alert('Success', 'Account verified and created!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Verification failed, please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await resendVerificationCode(email);
      if (response.success) {
        Alert.alert('Success', 'New verification code sent');
        startTimer();
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to resend code');
    }
  };

  const startTimer = () => {
    setIsResendAllowed(false);
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsResendAllowed(true);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      {!isVerifying ? (
        <SignUpForm
          username={username}
          email={email}
          password={password}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSignUp={handleSignUp}
          styles={styles}
        />
      ) : (
        <VerificationForm
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          timer={timer}
          handleVerifyCode={handleVerifyCode}
          handleResendCode={handleResendCode}
          isResendAllowed={isResendAllowed}
          styles={styles}
        />
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
