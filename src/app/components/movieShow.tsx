import HomeImage from "./image";

export default function HomeArticles() {
  return (
    <main className="pageWarper flex flex-col justify-start rounded p-8 ">
      <article className=" flex justify-start rounded p-8 homeComponent">
        <HomeImage imageSource={"/aot.jpg"} />
        <HomeImage imageSource={"/bb.png"} />
        <HomeImage imageSource={"/luffy.jpg"} />
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
            Anime collections
          </h2>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
      </article>
      <article className=" flex justify-start rounded p-8 homeComponent ">
        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
            Kdrama collections
          </h2>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
        <HomeImage imageSource={"/AOfAD.jpg"} />
        <HomeImage imageSource={"/TrueB.jpg"} />
        <HomeImage imageSource={"/her.png"} />
      </article>
      <article className=" flex justify-start rounded p-8 homeComponent">
        <HomeImage imageSource={"/Titanic.jpg"} />
        <HomeImage imageSource={"/WWZ.jpg"} />
        <HomeImage imageSource={"/Maleficent.jpg"} />

        <div className=" flex flex-col text-white text-center p-3">
          <h2 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
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
