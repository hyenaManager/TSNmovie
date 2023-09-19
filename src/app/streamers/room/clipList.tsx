"use client";

import { Suspense } from "react";
import VideoPlayer from "./clipVideo";
import { SkeletonSmClip } from "@/app/skeletons/skeletonClip";

type videoProps = {
  id: string;
  title: string | null;
  video: string;
  likes: string[];
  link: string | null;
  createAt: Date;
  updateAt: Date;
  pageOwnerId: string;
  createdBy: any;
};
export default function ClipList({ clips, pageData }: any) {
  return (
    <>
      <section>
        <div className=" grid gap-3 xsm:grid-cols-3 p-2 sm:grid-cols-5 ">
          {clips?.map((clip: videoProps) => (
            <Suspense fallback={<SkeletonSmClip />}>
              <VideoPlayer {...clip} key={clip.id} pageImage={pageData.image} />
            </Suspense>
          ))}
        </div>
      </section>
    </>
  );
}
