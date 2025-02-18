import { create } from "zustand";

type RouteType = {
  previousPath: string;
  newPath: string;
  setPreviousPath: (newPath: string) => void;
  setNewPath: (newPath: string) => void;
};

export const useRoutePath = create<RouteType>((set) => ({
  previousPath: "",
  newPath: "/",
  setPreviousPath: (newPath: string) =>
    set(() => ({
      previousPath: newPath,
    })),
  setNewPath: (newPath: string) =>
    set(() => ({
      newPath: newPath,
    })),
}));

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

export const useCurrentUploadings = create<CurrentLoading>((set) => ({
  currentUploading: [],
  updateCurrentUploading: (newUploading) =>
    set((state) => ({
      currentUploading: mySwitchMode(newUploading, state.currentUploading),
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

type sortedPageType = {
  sortedBy: string | null;
  sortPages: (newType: string) => void;
};
export const useSortedPage = create<sortedPageType>((set) => ({
  sortedBy: "mostViewed",
  sortPages: (newType: string) =>
    set(() => ({
      sortedBy: newType,
    })),
}));

type creatingPageType = {
  coverImage: File | null;
  profileImage: File | null;
  coverImageUrl: string | "";
  profileImageUrl: string | "";
  createdPageId: string | "";
  setCoverImage: (coverImage: File) => void;
  setProfileImage: (profileImage: File) => void;
  setCoverImageUrl: (coverImageUrl: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
  setPageId: (pageId: string) => void;
};
export const useCreatingPage = create<creatingPageType>((set) => ({
  coverImage: null,
  profileImage: null,
  coverImageUrl: "",
  profileImageUrl: "",
  createdPageId: "",
  setCoverImage: (coverImage: File) =>
    set(() => ({
      coverImage: coverImage,
    })),
  setProfileImage: (profileImage: File) =>
    set(() => ({
      profileImage: profileImage,
    })),
  setCoverImageUrl: (coverImageUrl: string) =>
    set(() => ({
      coverImageUrl: coverImageUrl,
    })),
  setProfileImageUrl: (profileImageUrl: string) =>
    set(() => ({
      profileImageUrl: profileImageUrl,
    })),
  setPageId: (pageId: string) =>
    set(() => ({
      createdPageId: pageId,
    })),
}));
