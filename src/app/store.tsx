import { User } from "@prisma/client";
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
type LoadingObj = {
  title: string;
  id: string;
  percent: number;
};

type CurrentLoading = {
  currentUploading: LoadingObj[];

  updateCurrentUploading: (newUploading: any) => void;
};

//for show current uploading processes
// export const useCurrentUploadings = create<CurrentLoading>((set) => ({
//   currentUploading: [],
//   updateCurrentUploading: (newUploading) =>
//     set(() => ({
//       currentUploading: newUploading,
//     })),
//   // setNewUploading: (newUploading) =>
//   //   set((state) => ({
//   //     currentUploading: [...state.currentUploading, newUploading],
//   //   })),
// }));

export const useCurrentUploadings = create<CurrentLoading>((set) => ({
  currentUploading: [],
  updateCurrentUploading: (newUploading) =>
    set((state) => ({
      currentUploading: mySwitchMode(newUploading, state.currentUploading),
      // state.currentUploading?.map((obj) => {
      //     if (obj.percent == 100) {
      //       console.log("it should be removed");
      //     } else if (obj.id === newUploading.id) {
      //       console.log("add new");

      //       return newUploading;
      //     } else {
      //       console.log("just return it");

      //       return obj;
      //     }
      //   })
      // myStoreUpdater(state.currentUploading, newUploading)
    })),
}));

const mySwitchMode = (newObj: { id: string; percent: number }, myList: any) => {
  const existingObject = myList.find((obj: any) => obj.id === newObj.id);
  let finalList: any = [];
  if (existingObject === undefined) {
    finalList = [...myList, newObj];
  } else {
    finalList = myList.map((obj: any) => (obj.id === newObj.id ? newObj : obj));
  }
  return finalList.filter((obj: any) => obj.percent != 100);
};

type notiType = {
  unSeenNotifications: number;
  setUnSeenNotifications: (notiCount: number) => void;
};

export const useNotifications = create<notiType>((set) => ({
  unSeenNotifications: 0,
  setUnSeenNotifications: (notiCount) =>
    set(() => ({
      unSeenNotifications: notiCount,
    })),
}));
type currentNav = {
  currentData: string | null;
  setCurrentNav: (newData: string) => void;
};
export const useAdminCurrentData = create<currentNav>((set) => ({
  currentData: "users",
  setCurrentNav: (newData: string) =>
    set(() => ({
      currentData: newData,
    })),
}));
