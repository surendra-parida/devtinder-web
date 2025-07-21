import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", { emailId, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Login failed"
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ firstName, lastName, emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
      toast.success("Signup successful please login!");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/logout");
      toast.success("Logged out successfully!");
      return null;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/profile/view");
      return res.data;
    } catch (err) {
      return rejectWithValue("Unauthorized");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { firstName, lastName, age, gender, photoUrl, skills, about },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch("/profile/edit", {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        skills,
        about,
      });
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (err) {
      toast.error("Update failed!");
      return rejectWithValue(err?.response?.data || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload?.data || action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
