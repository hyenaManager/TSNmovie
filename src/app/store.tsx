import { create } from "zustand";

type currentCataType = {
  currentCatgory: string;
  changeCurrentCatagory: (incommingCatagory: string) => void;
};
//current catagory in navagation of userPage ( like clips or series or movie)
export const useCatagory = create((set) => ({
  currentCatagory: "clips",
  changeCurrentCatagory: (incommingCatagory: string) =>
    set(() => ({ currentCatgory: incommingCatagory })),
}));
