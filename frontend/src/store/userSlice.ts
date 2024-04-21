import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type iUser, type iRepo } from "../types";

interface UserState {
  user: iUser | null;
  currentRepo: string;
  repoDetails: iRepo | null;
}

const initialState: UserState = {
  user: null,
  currentRepo: "",
  repoDetails: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUserDetails: (state, action: PayloadAction<iUser>) => {
      state.user = action.payload;
    },
    updatecurrentRepoName: (state, action: PayloadAction<string>) => {
      state.currentRepo = action.payload;
    },
    updatecurrentRepoDetails: (state, action: PayloadAction<iRepo>) => {
      state.repoDetails = action.payload;
    },
  },
});

export const {
  updateCurrentUserDetails,
  updatecurrentRepoName,
  updatecurrentRepoDetails,
} = userSlice.actions;
