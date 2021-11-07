import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: User;
  isLogin: boolean;
  errorSignup: any;
  errorLogin: "";
}
const initialState: InitialState = {
  user: {
    email: "",
    username: "",
    token: "",
  },
  errorSignup: "",
  errorLogin: "",
  isLogin: localStorage.getItem("token") ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUser: (state) => {
      return state;
    },
    userLoginFormSaga: (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;

      localStorage.setItem(`username`, action.payload.user.username);
      localStorage.setItem(`token`, action.payload.user.token);
    },
    signupUser: (state) => {
      return state;
    },
    signupUserFormSaga: (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;
      localStorage.setItem(`username`, action.payload.user.username);
      localStorage.setItem(`token`, action.payload.user.token);
    },
    logout: (state) => {
      state.isLogin = false;
      state.errorSignup = "";
      state.errorLogin = "";
      localStorage.clear();
    },
    errorSignup: (state, action) => {
      state.errorSignup = action.payload;
    },
    errorLogin: (state, action) => {
      state.errorLogin = action.payload;
    },
  },
});

export const {
  userLoginFormSaga,
  getUser,
  signupUser,
  signupUserFormSaga,
  logout,
} = loginSlice.actions;

export const { errorSignup, errorLogin } = loginSlice.actions;

export default loginSlice.reducer;
