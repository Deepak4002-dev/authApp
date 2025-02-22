import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../redux/authSlice";

const backendURL = "http://localhost:3000";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Signup (Register) Action
export const userRegister = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${backendURL}/auth/signup`,
        { username, email, password },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const userLogout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await axios.post(`${backendURL}/auth/logout`, {}, { withCredentials: true });

    // Clear local storage
    localStorage.clear();

    // Dispatch logout action to update Redux state
    dispatch(logout());

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
});



// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const backendURL = 'http://localhost:3000';

// export const userLogin = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       };
//       const { data } = await axios.post(
//         `${backendURL}/auth/login`,
//         { email, password },
//         config
//       );
      
//       // Don't check for data.success, just validate required fields
//       if (!data.token || !data.role) {
//         return rejectWithValue('Invalid server response: missing token or role');
//       }
      
//       return {
//         token: data.token,
//         role: data.role,
//         message: data.message || 'Login successful'
//       };
//     } catch (error) {
//       // Handle axios error response
//       const message = error.response?.data?.message || error.message || 'Login failed';
//       return rejectWithValue(message);
//     }
//   }
// );

// // Signup (Register) Action
// export const userRegister = createAsyncThunk(
//   'auth/signup',
//   async ({ username, email, password }, { rejectWithValue }) => {
//     try {
//       const config = { headers: { 'Content-Type': 'application/json' } };
//       const { data } = await axios.post(
//         `${backendURL}/auth/signup`,
//         { username, email, password },
//         config
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

