import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
 baseURL: process.env.REACT_APP_API_URL,
 headers: {
  "Content-Type": "application/json",
 },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

export default axiosInstance;
