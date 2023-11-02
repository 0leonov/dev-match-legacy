import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/interfaces";

export interface SessionState {
  accessToken: string | null;
  user: User | null;
}

const initialState: SessionState = {
  accessToken: null,
  user: null,
};

export const sessionSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<SessionState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.user = null;
    },
    resetSession: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { updateSession, updateUser, updateToken, resetSession } =
  sessionSlice.actions;

export default sessionSlice.reducer;
