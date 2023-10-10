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
  },
});

export const { set } = sessionSlice.actions;

export default sessionSlice.reducer;
