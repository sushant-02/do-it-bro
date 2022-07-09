import create from "zustand";

import createSafeAreaViewSlice from "./safeAreaView";
import createOTPSlice from "./OTP";
import createAuthSlice from "./Auth";
import { OTPSlice, SafeAreaViewSlice, AuthSlice } from "./types";

const useStore = create<OTPSlice & SafeAreaViewSlice & AuthSlice>()(
  (...args) => ({
    ...createOTPSlice(...args),
    ...createSafeAreaViewSlice(...args),
    ...createAuthSlice(...args),
  })
);

export default useStore;
