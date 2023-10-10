"use client";

import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Loading from "../components/loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
export default function GettingStart() {
  const router = useRouter();

  return (
    <>
      <div className="pageWarper z-50 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white flex flex-col justify-center items-center">
        <div className=" flex flex-col border bg-center shadow-2xl rounded-t-xl justify-center h-[50vh] xsm:w-[95vw] sm:w-[54vw] items-center relative">
          <h2
            className=" text-center text-[50px] text-white font-mono"
            style={{ textShadow: "2px 2px 8px gray" }}
          >
            Hey buddy you starting in our app feel free to contact us
          </h2>
          <Link
            href={`/gettingStart/coverPicture`}
            className="bg-green-400 hover:bg-green-600 p-2 rounded-md"
          >
            Create your own page
          </Link>
        </div>
      </div>
    </>
  );
}
