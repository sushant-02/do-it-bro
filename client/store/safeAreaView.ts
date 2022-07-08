import { StateCreator } from "zustand";

import { SafeAreaViewSlice } from "./types";

const createSafeAreaViewSlice: StateCreator<SafeAreaViewSlice> = (set) => ({
  safeAreaHeight: 0,
  setSafeAreaHeight: (value: number) => set(() => ({ safeAreaHeight: value })),
});

export default createSafeAreaViewSlice;
