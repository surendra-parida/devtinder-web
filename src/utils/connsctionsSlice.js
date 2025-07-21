import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";

const initialState = {
  connections: [],
  status: "idle",
  error: null,
};

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/user/connections`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || "Fetching connections failed"
      );
    }
  }
);

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    removeConnections: (state) => {
      state.connections = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.connections = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
