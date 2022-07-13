import { StateCreator } from "zustand";

import doItBroAPI from "../api/doItBro";
import { loadTokensToState } from "../utils/commonUtils";
import { AuthSlice } from "./types";

const createAuthSlice: StateCreator<AuthSlice> = (set, getState) => ({
  refreshToken: null,
  accessToken: null,
  setTokens: (refreshToken: string, accessToken: string) => {
    set((state) => ({ ...state, refreshToken, accessToken }));
  },
  unsetTokens: () => {
    set((state) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      user: null,
    }));
  },
  user: null,
  getUser: async () => {
    // @ts-ignore
    let { safeAreaHeight, accessToken } = getState();

    if (!accessToken) {
      const [tokens]: any = await loadTokensToState();
      accessToken = tokens.access;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const { data: userData } = await doItBroAPI.get("user/", config);
      set((state) => ({ ...state, user: userData }));

      return new Promise((resolve) => resolve(true));
    } catch (err: any) {
      return new Promise((_resolve, reject) => reject(false));
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

export default createAuthSlice;
