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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const responseData = error?.response?.data;
    if (status === 401) {
      toast.error("Session expired. Please login again.");
    } else if (status === 403) {
      toast.error("You don't have permission to perform this action.");
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (!status) {
      toast.error("Network error. Please check your connection.");
    }
    const rawErrorMessage =
      typeof responseData === "string" ? responseData : "";

    if (
      rawErrorMessage.includes("SSL routines") ||
      rawErrorMessage.includes("tlsv1 alert") ||
      rawErrorMessage.includes("ENOTFOUND") ||
      rawErrorMessage.includes("ECONNREFUSED")
    ) {
      error.response.data =
        "Server error: Unable to connect. Please try again later.";
    }
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
