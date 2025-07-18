import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  feed: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 1,
};

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async ({ page = 1, limit = 3 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/feed?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Fetching feed failed");
    }
  }
);

export const sendInterestRequest = createAsyncThunk(
  "feed/sendInterestRequest",
  async ({ userId, status }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`/request/send/${status}/${userId}`);
      const message =
        status === "interested"
          ? "Interest sent successfully!"
          : status === "ignored"
          ? "Ignored successfully!"
          : "Request completed!";
      toast.success(message);
      dispatch(fetchFeed());

      return res.data;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      return rejectWithValue(err?.response?.data || "Request failed");
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    removeFeed: (state) => {
      state.feed = [];
      state.status = "idle";
      state.error = null;
      state.totalPages = 0;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.status = "succeeded";
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
