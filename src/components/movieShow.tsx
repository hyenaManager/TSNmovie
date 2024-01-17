import HomeImage from "./image";
import neko from "public/kke.png";
import levi from "public/levi.png";
import luffyKid from "public/luffyKid.png";

export default function HomeArticles() {
  return (
    <main className="pageWarper flex flex-col justify-start rounded p-8 ">
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <HomeImage imageSource={neko} />
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Anime collections
          </h2>
          <p className=" text-slate-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vitae
            debitis quas doloremque! Velit non magni culpa voluptatem dolorem?
            Distinctio fuga ad sint. Libero fuga molestias magnam tempore quae
            accusantium! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Atque tempora porro quam modi quo harum velit voluptate sequi
            iure deserunt quisquam cupiditate, vitae ad, ipsum ea numquam,
            maiores dicta. Tenetur?
          </p>
        </div>
      </article>
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Kdrama collections
          </h2>
          <p className=" text-slate-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vitae
            debitis quas doloremque! Velit non magni culpa voluptatem dolorem?
            Distinctio fuga ad sint. Libero fuga molestias magnam tempore quae
            accusantium! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Atque tempora porro quam modi quo harum velit voluptate sequi
            iure deserunt quisquam cupiditate, vitae ad, ipsum ea numquam,
            maiores dicta. Tenetur?
          </p>
        </div>

        <HomeImage imageSource={levi} />
      </article>
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <HomeImage imageSource={luffyKid} />

        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Hollywood collections
          </h2>
          <p className=" text-slate-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vitae
            debitis quas doloremque! Velit non magni culpa voluptatem dolorem?
            Distinctio fuga ad sint. Libero fuga molestias magnam tempore quae
            accusantium! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Atque tempora porro quam modi quo harum velit voluptate sequi
            iure deserunt quisquam cupiditate, vitae ad, ipsum ea numquam,
            maiores dicta. Tenetur?
          </p>
        </div>
      </article>
    </main>
  );
}
