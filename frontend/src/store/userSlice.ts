import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type iUser } from "../types";

interface UserState {
  user: iUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUserDetails: (state, action: PayloadAction<iUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateCurrentUserDetails } = userSlice.actions;
