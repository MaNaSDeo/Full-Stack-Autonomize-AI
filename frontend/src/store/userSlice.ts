import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type iUser } from "../types";

interface UserState {
  user: iUser | null;
  currentRepo: string;
}

const initialState: UserState = {
  user: null,
  currentRepo: "",
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
  },
});

export const { updateCurrentUserDetails, updatecurrentRepoName } =
  userSlice.actions;
