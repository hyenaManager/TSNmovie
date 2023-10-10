export function CommentSkeleton() {
  return (
    <li className=" w-full max-h-fit flex mb-2 justify-start animate-pulse">
      <div className=" w-[40px] h-[40px] bg-fuchsia-500 rounded-full"></div>
      <div className="w-full flex flex-col justify-start ml-2 h-[40px] p-1">
        <p className="w-full max-h-fit bg-fuchsia-500 text-white text-sm rounded-md p-3"></p>
      </div>
    </li>
  );
}
