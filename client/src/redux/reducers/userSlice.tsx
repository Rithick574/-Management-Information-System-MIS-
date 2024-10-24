import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../actions/userActions";

const initialState = {
  loading: false as boolean,
  user: null as any | null,
  error: null as any | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //logout states
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      });
  },
});
export const { updateError } = userSlice.actions;
export default userSlice.reducer;
