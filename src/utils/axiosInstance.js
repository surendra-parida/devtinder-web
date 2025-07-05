// utils/axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      toast.error("Session expired. Please login again.");
    }
    if (status === 403) {
      toast.error("You don't have permission to perform this action.");
    }
    if (status >= 500) {
      toast.error("Server error. Please try again later.");
    }
    if (!status) {
      toast.error("Network error. Please check your connection.");
    }

    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
