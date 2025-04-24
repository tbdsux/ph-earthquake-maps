import { getCurrentDate } from "@/lib/dates";
import { create } from "zustand";

type FDSettings = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  resetDate: () => void;
};

export const useFDSettings = create<FDSettings>()((set) => ({
  date: getCurrentDate(),
  setDate: (date: Date | undefined) => set(() => ({ date })),
  resetDate: () => set(() => ({ date: undefined })),
}));
