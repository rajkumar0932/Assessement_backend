import axios from "axios";

// one axios instance for the whole app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:2200",
  withCredentials: true,
});

// attach the access token (saved at login) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
