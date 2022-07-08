import create from "zustand";

import createSafeAreaViewSlice from "./safeAreaView";
import createOTPSlice from "./OTP";
import { OTPSlice, SafeAreaViewSlice } from "./types";

const useStore = create<OTPSlice & SafeAreaViewSlice>()((...args) => ({
  ...createOTPSlice(...args),
  ...createSafeAreaViewSlice(...args),
}));

export default useStore;
