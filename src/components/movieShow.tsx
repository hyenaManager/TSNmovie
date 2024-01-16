import HomeImage from "./image";

export default function HomeArticles() {
  return (
    <main className="pageWarper flex flex-col justify-start rounded p-8 ">
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <HomeImage imageSource={"/luffy.jpg"} />
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Anime collections
          </h2>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
      </article>
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Kdrama collections
          </h2>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>

        <HomeImage imageSource={"/her.png"} />
      </article>
      <article className="pageWarper flex xsm:justify-center justify-start rounded xsm:p-1 sm:p-8">
        <HomeImage imageSource={"/Maleficent.jpg"} />

        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" p-2 text-fuchsia-600 font-mono xsm:text-lg sm:text-4xl">
            Hollywood collections
          </h2>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
      </article>
    </main>
  );
}
