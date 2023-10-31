import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Reports() {
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/reports");
      if (response.status === 200) {
        return response.data;
      } else {
        return toast.error("there is something error");
      }
    },
  });
  const deleteReport = useMutation(
    async (id: string) => {
      const response = await axios.delete(
        `http://localhost:3000/api/reports?reportId=${id}`
      );
      if (response.status === 200) {
        return toast.success(response.data);
      } else {
        toast.error(response.statusText);
      }
    },
    {
      onSettled: () => queryClient.invalidateQueries(["allReports"]),
    }
  );
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error" || !data) {
    return <p>Error: error</p>;
  }
  return (
    <ul className=" w-full h-full flex flex-col justify-start text-lg items-center">
      {data?.length === 0 && <p>No reports yet</p>}
      {data?.map((report: any) => (
        <li className=" w-full flex justify-between">
          <div className="mainNoti w-full flex justify-start items-center ">
            <Image
              src={report?.postOwner.image}
              alt="noti"
              width={20}
              height={20}
              className="xsm:w-[20px] xsm:h-[20px] sm:w-[30px] sm:h-[30px] rounded-full object-cover mr-1"
            />
            <p className=" p-1">
              {report?.postOwner.firstName} {report?.postOwner.lastName}
            </p>
          </div>
          <Link
            href={{
              pathname: `/adminSite/clip`,
              query: {
                clipId: report?.postId,
              },
            }}
            className=" p-1 text-end cursor-pointer"
          >
            check
          </Link>
          <button
            onClick={() => deleteReport.mutate(report?.id)}
            className="actions flex justify-end w-full items-center "
          >
            <FontAwesomeIcon
              icon={faTrash}
              className=" text-red-600 w-[18px] h-[18px]"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
