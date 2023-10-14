import { create } from "zustand";

type State = {
  currentCatagory: string;
};

type Action = {
  changeCurrentCatagory: (newCatagory: State["currentCatagory"]) => void;
};

// Current category in navigation of userPage (like clips or series or movie)
export const useCatagory = create<State & Action>((set) => ({
  currentCatagory: "clips",
  changeCurrentCatagory: (newCatagory) =>
    set(() => ({ currentCatagory: newCatagory })),
}));
