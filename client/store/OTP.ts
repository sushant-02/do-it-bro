import { StateCreator } from "zustand";

import { OTPSlice } from "./types";
import handleError from "../utils/handleError";
import doItBroAPI from "../api/doItBro";

const createOTPSlice: StateCreator<OTPSlice> = (set, getState) => ({
  email: "",
  otpLoading: false,
  setEmail: (email) => set((state) => ({ ...state, email })),
  sendOTP: async (email, navigate, showFlashMessage) => {
    // @ts-ignore
    const { safeAreaHeight } = getState();

    set((state) => ({ ...state, otpLoading: true }));

    try {
      await doItBroAPI.post("send-otp/", { email });
      if (navigate) navigate();
      if (showFlashMessage) showFlashMessage();
    } catch (err: any) {
      handleError(err, null, safeAreaHeight);
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

export default createOTPSlice;
