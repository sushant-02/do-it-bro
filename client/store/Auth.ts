import { StateCreator } from "zustand";

import doItBroAPI from "../api/doItBro";
import handleError from "../utils/handleError";
import { AuthSlice } from "./types";

const createAuthSlice: StateCreator<AuthSlice> = (set, getState) => ({
  refreshToken: null,
  accessToken: null,
  setTokens: (refreshToken: string, accessToken: string) => {
    set((state) => ({ ...state, refreshToken, accessToken }));
  },
  user: null,
  getUser: async () => {
    // @ts-ignore
    const { safeAreaHeight, accessToken } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const { data: userData } = await doItBroAPI.get("get-user/", config);
      set((state) => ({ ...state, user: userData }));

      return new Promise((resolve) => resolve(true));
    } catch (err: any) {
      console.log(err.response);
      handleError(err, safeAreaHeight);

      return new Promise((resolve) => resolve(false));
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

export default createAuthSlice;
