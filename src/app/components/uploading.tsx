export default function Uploading() {
  return (
    <div className=" fixed top-14 max-w-fit right-50 z-20 border">
      <progress
        max={100}
        value={32}
        color="purple"
        className="bg-fuchsia-600 rounded-md"
      ></progress>
    </div>
  );
}
