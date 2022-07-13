import create from "zustand";

import createSafeAreaViewSlice from "./safeAreaView";
import createOTPSlice from "./OTP";
import createAuthSlice from "./Auth";
import createDailyTasksSlice from "./DailyTasks";
import {
  OTPSlice,
  SafeAreaViewSlice,
  AuthSlice,
  DailyTasksSlice,
} from "./types";

const useStore = create<
  OTPSlice & SafeAreaViewSlice & AuthSlice & DailyTasksSlice
>()((...args) => ({
  ...createOTPSlice(...args),
  ...createSafeAreaViewSlice(...args),
  ...createAuthSlice(...args),
  ...createDailyTasksSlice(...args),
}));

export default useStore;
