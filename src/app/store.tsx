import { create } from "zustand";

type CatagoryState = {
  currentCatagory: string;
  changeCurrentCatagory: (newCatagory: string) => void;
};
// Current category in navigation of userPage (like clips or series or movie)
export const useCatagory = create<CatagoryState>((set) => ({
  currentCatagory: "clips",
  changeCurrentCatagory: (newCatagory) =>
    set(() => ({ currentCatagory: newCatagory })),
}));

type CurrentLoading = {
  currentUploading: object[];
  updateCurrentUploading: (newUploading: {
    title: string;
    loadingPercent: string;
    id: string;
  }) => void;
  setNewUploading: (newUploading: {
    title: string;
    loadingPercent: string;
    id: string;
  }) => void;
};

//for show current uploading processes
export const useCurrentUploadings = create<CurrentLoading>((set) => ({
  currentUploading: [],
  updateCurrentUploading: (newUploading) =>
    set((state) => ({
      currentUploading: state.currentUploading.map((process: any) => {
        //update only the target loading percent
        if (process.id === newUploading.id) {
          return { ...process, loadingPercent: newUploading.loadingPercent };
        } else {
          return process;
        }
      }),
    })),
  setNewUploading: (newUploading) =>
    set((state) => ({
      currentUploading: [...state.currentUploading, newUploading],
    })),
}));
