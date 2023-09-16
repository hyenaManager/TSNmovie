import React from "react";
import GetPageByItsUnique from "./getPageByUnique";
import Main from "./main";

export default function Pages() {
<<<<<<< HEAD
  const [timeUp, setTimeUp] = useState(false);
  const { data, status, error } = useQuery({
    queryKey: ["userPages"],
    queryFn: getPages,
  });

  const fakeData = data?.map((index: number) => (
    <SkeletonStreamer key={index} />
  ));
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeUp(true);
    }, 5000);

    // Don't forget to clear the timer to prevent memory leaks
    return () => clearTimeout(timerId);
  }, []);

=======
>>>>>>> prismaIn
  return (
    <div className="pageWarper flex justify-center text-white  ">
      <aside className=" w-4hundred h-[100vh] bg-slate-950 pt-14 p-2 ">
        <GetPageByItsUnique />
      </aside>
      <Main />
    </div>
  );
}
