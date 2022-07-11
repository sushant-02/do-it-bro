import { StateCreator } from "zustand";

import { DailyTasksSlice } from "./types";
import { loadTokensToState } from "../utils/commonUtils";
import handleError from "../utils/handleError";
import doItBroAPI from "../api/doItBro";

const createDailyTasksSlice: StateCreator<DailyTasksSlice> = (
  set,
  getState
) => ({
  dailyTasks: [],
  tasksLoading: true,
  getDailyTasks: async () => {
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
      const { data } = await doItBroAPI.get("daily/", config);
      set((state) => ({ ...state, dailyTasks: data.tasks }));

      return new Promise((resolve) => resolve(true));
    } catch (err: any) {
      handleError(err, null, safeAreaHeight);
      return new Promise((_resolve, reject) => reject(false));
    } finally {
      set((state) => ({ ...state, tasksLoading: false }));
    }
  },
});

export default createDailyTasksSlice;
