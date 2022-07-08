import { StateCreator } from "zustand";

import { OTPSlice } from "./types";
import handleError from "../utils/handleError";
import doItBroAPI from "../api/doItBro";

import useStore from "../store";

const createOTPSlice: StateCreator<OTPSlice> = (set, getState) => ({
  email: "",
  otpLoading: false,
  setEmail: (email) => set((state) => ({ ...state, email })),
  sendOTP: async (email, navigate) => {
    // @ts-ignore
    const { safeAreaHeight } = getState();

    set((state) => ({ ...state, otpLoading: true }));

    try {
      await doItBroAPI.post("send-otp/", { email });
      navigate();
    } catch (err: any) {
      handleError(err, safeAreaHeight);
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

export default createOTPSlice;
