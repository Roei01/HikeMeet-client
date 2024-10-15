import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

const VerificationForm = ({ verificationCode, setVerificationCode, timer, handleVerifyCode, handleResendCode, isResendAllowed, styles }) => {
  return (
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
    </>
  );
};

export default VerificationForm;
