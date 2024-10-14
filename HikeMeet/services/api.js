import axios from 'axios';

// קביעת כתובת הבסיס של ה-API
export const API_URL = 'http://localhost:5000/api';

// שמירת הטוקן ב-localStorage
const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

// אחזור הטוקן מ-localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// יצירת אובייקט axios מותאם אישית
const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

// פונקציות API

export const login = async (username, password) => {
  const response = await createAxiosInstance().post('/auth/login', {
    username,
    password,
  });
  const { token } = response.data;
  setToken(token);  // שמירת הטוקן ב-localStorage
  return response.data;
};

export const signup = async (username, password) => {
  const response = await createAxiosInstance().post('/auth/signup', {
    username,
    password,
  });
  const { token } = response.data;
  setToken(token);  // שמירת הטוקן ב-localStorage
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = getToken();
  const response = await createAxiosInstance(token).post('/auth/change-password', {
    currentPassword,
    newPassword,
  });
  const newToken = response.data.token;
  setToken(newToken);  // שמירת הטוקן החדש ב-localStorage
  return response.data;
};

export const performBackup = async () => {
  const token = getToken();
  const response = await createAxiosInstance(token).post('/backup');
  const newToken = response.data.token;
  setToken(newToken);  // שמירת הטוקן החדש ב-localStorage
  return response.data;
};

export const manageUsers = async () => {
  const token = getToken();
  const response = await createAxiosInstance(token).get('/manage-users');
  const newToken = response.data.token;
  setToken(newToken);  // שמירת הטוקן החדש ב-localStorage
  return response.data;
};

export const checkForUpdates = async () => {
  const token = getToken();
  const response = await createAxiosInstance(token).get('/system-updates');
  const newToken = response.data.token;
  setToken(newToken);  // שמירת הטוקן החדש ב-localStorage
  return response.data;
};

// פונקציות נוספות בהתאם לצורך...
