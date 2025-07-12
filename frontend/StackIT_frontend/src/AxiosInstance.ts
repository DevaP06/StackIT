// AxiosInstance.ts
import axios from 'axios';

let baseURL: string;
const isDevelopment = import.meta.env.MODE === "development"

if(isDevelopment){
  baseURL = import.meta.env.VITE_API_BASE_URL_LOCAL || 'http://localhost:5000'
}
else{
  baseURL =  import.meta.env.VITE_API_BASE_URL_DEPLOY || 'http://localhost:5000'
}

console.log('API Base URL:', baseURL);
console.log('Environment:', import.meta.env.MODE);

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    accept: "application/json"
  },
});

// Add request interceptor to automatically add auth token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
// in applications import as api
