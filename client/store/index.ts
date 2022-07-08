import create, { StateCreator } from "zustand";
import { showMessage, hideMessage } from "react-native-flash-message";

import doItBroAPI from "../api/doItBro";

interface SafeAreaViewSlice {
  safeAreaHeight: number;
  setSafeAreaHeight: (value: number) => void;
}

const createSafeAreaViewSlice: StateCreator<SafeAreaViewSlice> = (set) => ({
  safeAreaHeight: 0,
  setSafeAreaHeight: (value: number) => set(() => ({ safeAreaHeight: value })),
});

interface OTPSlice {
  email: string;
  otpLoading: boolean;
  setEmail: (text: string) => void;
  sendOTP: (email: string, navigate: () => void) => Awaited<Promise<any>>;
}

const createOTPSlice: StateCreator<OTPSlice> = (set, getState) => ({
  email: "",
  otpLoading: false,
  setEmail: (email) => set((state) => ({ ...state, email })),
  sendOTP: async (email, navigate) => {
    set((state) => ({ ...state, otpLoading: true }));

    // @ts-ignore
    const { safeAreaHeight } = getState();

    try {
      await doItBroAPI.post("send-otp/", { email });
      navigate();
    } catch (err) {
      showMessage({
        message: "Something went wrong!",
        type: "danger",
        position: { top: safeAreaHeight },
      });
    } finally {
      set((state) => ({ ...state, otpLoading: false }));
    }
  },
});

const useStore = create<OTPSlice & SafeAreaViewSlice>()((...args) => ({
  ...createOTPSlice(...args),
  ...createSafeAreaViewSlice(...args),
}));

export default useStore;
