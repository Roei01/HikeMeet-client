import axios from 'axios';

const BASE_URL = 'http://172.20.10.4:3000/api';

export const requestVerificationCode = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/request-verification`, { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Error requesting verification code');
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-code`, { email, code });
    return response.data;
  } catch (error) {
    throw new Error('Error verifying code');
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/resend-code`, { email });
    return response.data;
  } catch (error) {
    throw new Error('Error resending verification code');
  }
};
