export default function CatagoryNavbar({ pageName }: { pageName: string }) {
  return (
    <>
      <nav className="w-full mt-2 flex justify-between ">
        <ul className="flex w-full items-center">
          <li className=" text-center w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            All
          </li>
          <li className=" text-center w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            Series
          </li>
          <li className=" text-center w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            Movie
          </li>
          <li className=" text-center w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            Clips
          </li>
          <li className=" text-center w-full h-full bg-black p-3 hover:bg-fuchsia-600 ">
            Drama
          </li>
        </ul>
      </nav>
    </>
  );
}
