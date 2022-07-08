import { StateCreator } from "zustand";

import { AuthSlice } from "./types";

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  refreshToken: null,
  accessToken: null,
  setTokens: (refreshToken: string, accessToken: string) => {
    set((state) => ({ ...state, refreshToken, accessToken }));
  },
});

export default createAuthSlice;
