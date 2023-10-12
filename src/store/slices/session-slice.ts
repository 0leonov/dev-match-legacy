import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/user";

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
    set: (state, action: PayloadAction<SessionState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { set, setUser, signOut } = sessionSlice.actions;

export default sessionSlice.reducer;
