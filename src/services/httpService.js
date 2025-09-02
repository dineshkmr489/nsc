import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance
const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => http.post('/auth/login', credentials),
  logout: () => http.post('/auth/logout'),
  getProfile: () => http.get('/auth/profile'),
};

// Admin API calls
export const adminAPI = {
  getAdmins: () => http.get('/admins'),
  createAdmin: (adminData) => http.post('/admins', adminData),
  updateAdmin: (id, adminData) => http.put(`/admins/${id}`, adminData),
  deleteAdmin: (id) => http.delete(`/admins/${id}`),
};

// Content API calls
export const contentAPI = {
  uploadVideo: (formData) => http.post('/content/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadAudio: (formData) => http.post('/content/audio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadJson: (jsonData) => http.post('/content/json', jsonData),
  getContent: () => http.get('/content'),
};

// Monitoring API calls
export const monitoringAPI = {
  getDevices: () => http.get('/monitoring/devices'),
  updateDevice: (id, deviceData) => http.put(`/monitoring/devices/${id}`, deviceData),
  getJourneys: () => http.get('/monitoring/journeys'),
  selectJourney: (journeyId) => http.post('/monitoring/select-journey', { journeyId }),
};

export default http;