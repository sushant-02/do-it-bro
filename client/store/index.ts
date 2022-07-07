import create, { StateCreator } from "zustand";

import doItBroAPI from "../api/doItBro";

interface OTPSlice {
  email: string;
  otpLoading: boolean;
  setEmail: (text: string) => void;
  sendOTP: (email: string, navigate: () => void) => Awaited<Promise<any>>;
}

const createOTPSlice: StateCreator<OTPSlice> = (set) => ({
  email: "",
  otpLoading: false,
  setEmail: (email) => set((state) => ({ ...state, email })),
  sendOTP: async (email, navigate) => {
    set((state) => ({ ...state, otpLoading: true }));

    try {
      await doItBroAPI.post("send-otp/", { email });
      navigate();
    } catch (err) {
      console.log(err);
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

const useStore = create<OTPSlice>()((...args) => ({
  ...createOTPSlice(...args),
}));

export default useStore;
