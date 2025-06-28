import axios from "axios";

const baseURL = "http://localhost:3000/api/auth"; // ✅ updated to correct port
// https://tasko-server-1.onrender.com

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
