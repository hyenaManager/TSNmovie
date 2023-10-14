import React from "react";
import { useCurrentUploadings } from "../store";
import { ProgressingUpload } from "./uploading";

export default function CurrentUploading() {
  const currentUploading = useCurrentUploadings(
    (state) => state.currentUploading
  );
  console.log(currentUploading);

  return (
    <div className="fixed top-10 right-2 max-w-fit max-h-fit flex justify-center flex-col z-50">
      {currentUploading.map((currentLoading: any) => (
        <ProgressingUpload
          percent={currentLoading.loadingPercent}
          key={currentLoading.id}
        />
      ))}
    </div>
  );
}
