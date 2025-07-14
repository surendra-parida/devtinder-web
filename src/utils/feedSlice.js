import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";

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
        console.log(action.payload);
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
