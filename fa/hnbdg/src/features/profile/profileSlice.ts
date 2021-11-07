import { createSlice } from "@reduxjs/toolkit";

export interface State {
  profile: {
    username: string;
    email: string;
    password?: string;
    image?: string;
    bio?: string;
  };
  errorMessage: any;
}

const initialState: State = {
  profile: { username: "", email: "", password: "", image: "", bio: "" },
  errorMessage: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state) => state,
    getProfileFromSaga: (state, action) => {
      //   const username = action.payload.username
      state.profile = action.payload;
    },

    updateUser: (state) => state,
    updateUserFromSaga: (state, action) => {
      state.profile = action.payload;
      state.errorMessage = {};
    },

    errorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { getProfile, getProfileFromSaga } = profileSlice.actions;

export const { updateUser, updateUserFromSaga } = profileSlice.actions;

export const { errorMessage } = profileSlice.actions;

export default profileSlice.reducer;
