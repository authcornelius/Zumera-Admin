import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.data;
      Cookies.set("jwtasset", action.payload.token, { expires: 2 });
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("jwtasset");
    },
    resetAuth: () => initialState,
  },
});

export const {
  setCredentials,
  logout,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
