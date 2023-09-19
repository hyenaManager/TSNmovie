import ClipList from "./clipList";
import CatagoryNavbar from "./catagoryOfMovie";
import SeriesList from "./seriesList";

type videoProp = { name: string; image: string; id: string; author: string };

export default function MainList() {
  return (
    <div className=" pageWarper relative ">
      <CatagoryNavbar />
      <ClipList />
      <SeriesList />
    </div>
  );
}
