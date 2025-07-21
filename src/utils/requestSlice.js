import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  requests: [],
  status: "idle",
  error: null,
};

export const fetchReceivedRequests = createAsyncThunk(
  "requests/fetchReceivedRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/user/requests/recieved");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch received requests"
      );
    }
  }
);

export const reviewRequest = createAsyncThunk(
  "requests/reviewRequest",
  async ({ status, requestId }, { dispatch }) => {
    try {
      await axios.post(`/request/review/${status}/${requestId}`);
      toast.success(`Request ${status} successfully!`);
      dispatch(fetchReceivedRequests());
      return { status, requestId };
    } catch (err) {
      toast.error(err || "Something went wrong while reviewing request");
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    clearRequests: (state) => {
      state.requests = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivedRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReceivedRequests.fulfilled, (state, action) => {
        state.requests = action.payload.connectionRequest;
        state.status = "succeeded";
      })
      .addCase(fetchReceivedRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearRequests } = requestSlice.actions;

export default requestSlice.reducer;
