export default function Testing() {
  return (
    <>
      <main className=" pt-14 h-[100vh] w-[100%]">
        <div className=" border-2 h-[70%] w-[70%] relative">
          <div className=" border-2 border-green-600 h-[50%] w-[50%] relative">
            <button className="text-white absolute top-0 right-0">
              Button1
            </button>
          </div>
          <button className="text-white absolute top-0 right-0">Button2</button>
        </div>
      </main>
    </>
  );
}
