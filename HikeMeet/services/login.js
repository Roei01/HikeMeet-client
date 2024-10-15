import axios from 'axios';

const BASE_URL = 'http://172.20.10.4:3000/api';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });

    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
