"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    toast.error(error.message);
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <svg
            className=" mx-auto h-[50px] w-[50px] text-red-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <div className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <h3 className=" text-red-500">
              Seem like there is a problem please check you internet connection
              and try again
            </h3>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className="px-5 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
