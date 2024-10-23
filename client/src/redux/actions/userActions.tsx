import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../common/configurations";

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/user/logout`, config);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
