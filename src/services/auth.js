import axiosInstance, { API_BASE } from '../services/axiosInstance';
import { jwtDecode } from 'jwt-decode';



import CryptoJS from 'crypto-js';

const TOKEN_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';
const SECRET_KEY = 'AERF3456sd34TG@2&è(--+à@fjffkdz,'; 

// Encrypt & store token
const saveToken = (token, refreshToken) => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  const encryptedRefresh = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();

  localStorage.setItem(TOKEN_KEY, encrypted);
  localStorage.setItem(REFRESH_KEY, encryptedRefresh);
};


const getToken = () => {
  const encrypted = localStorage.getItem(TOKEN_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8); // Just return raw decrypted JWT
  } catch (e) {
    console.error('Token decryption failed:', e);
    return null;
  }
};

export const getUserInfoFromToken = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Decode the JWT
    console.log('Decoded JWT:', decoded);

    // Extract fields directly (these must be included in the token when it's generated server-side)
    return {
      customerID: decoded.customerID,
      firstName: decoded.FirstName,
      lastName: decoded.LastName,
      email: decoded.email,
      phoneNumber: decoded.phoneNumber,
      iden:decoded.Iden
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


const getRefreshToken = () => {
  const encrypted = localStorage.getItem(REFRESH_KEY);
  if (!encrypted) return null;
  try {
    return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};




export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post(`${API_BASE}/customer/login`, { email, password });
    const { accessToken, refreshToken } = response.data;
    saveToken(accessToken, refreshToken);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};


export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await axiosInstance.post(`${API_BASE}/change-password`, { oldPassword, newPassword });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Change-password failed');
  }
};





export const refreshToken = async () => {
  const token = getRefreshToken();
  if (!token) throw new Error('No refresh token found');

  try {
    const response = await axiosInstance.post(`${API_BASE}/refresh-token?refreshToken=${token}`);
    const { access_token, refresh_token } = response.data;
    saveToken(access_token, refresh_token);
    return access_token;
  } catch (err) {
    clearTokens();
    throw new Error('Token refresh failed');
  }
};

export const logout = () => {
  clearTokens();
};

// Function to extract user_id from JWT token
export const getUserIdFromToken = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Decode the JWT
    console.log('Decoded JWT:', decoded); // Log the entire decoded JWT

    return decoded.customerID || null; // Return userID if present
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
export const getAuthToken = () => getToken();
