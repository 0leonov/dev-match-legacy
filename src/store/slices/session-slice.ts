import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/interfaces";

export interface SessionState {
  accessToken: string | null;
  user: User | null;
  isFetching: boolean;
}

export interface UpdateSessionPayload {
  accessToken: string | null;
  user: User | null;
}

const initialState: SessionState = {
  accessToken: null,
  user: null,
  isFetching: false,
};

export const sessionSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<UpdateSessionPayload>) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    updateToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
    updateIsFetching(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isFetching: action.payload,
      };
    },
    resetSession: () => {
      return initialState;
    },
  },
});

export const {
  updateSession,
  updateUser,
  updateToken,
  updateIsFetching,
  resetSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
