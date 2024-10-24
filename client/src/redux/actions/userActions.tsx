import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../common/configurations";
import { URL } from "../../common/api";

interface UserCredentials {
  email: string;
  password: string;
}

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth`, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//login
export const login = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: UserCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/auth`, userCredentials, config);
      console.log("🚀 ~ file: userActions.tsx:35 ~ data:", data);
      return data.data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
