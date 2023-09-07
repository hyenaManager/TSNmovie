import HomeImage from "./image";

export default function Head() {
  return (
    <div className=" flex flex-col justify-start rounded p-8 ">
      <div className=" flex justify-start rounded p-8 homeComponent">
        <HomeImage imageSource={"/aot.jpg"} />
        <HomeImage imageSource={"/bb.png"} />
        <HomeImage imageSource={"/luffy.jpg"} />
        <div className=" flex flex-col text-white text-center p-3">
          <h3 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
            Anime collections
          </h3>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
      </div>
      <div className=" flex justify-start rounded p-8 homeComponent ">
        <div className=" flex flex-col text-white text-center p-3">
          <h3 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
            Kdrama collections
          </h3>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
        <HomeImage imageSource={"/AOfAD.jpg"} />
        <HomeImage imageSource={"/TrueB.jpg"} />
        <HomeImage imageSource={"/her.png"} />
      </div>
      <div className=" flex justify-start rounded p-8 homeComponent">
        <HomeImage imageSource={"/Titanic.jpg"} />
        <HomeImage imageSource={"/WWZ.jpg"} />
        <HomeImage imageSource={"/Maleficent.jpg"} />

        <div className=" flex flex-col text-white text-center p-3">
          <h3 className=" text-4xl  p-2 text-fuchsia-600 font-mono">
            Hollywood collections
          </h3>
          <p className=" text-slate-200">
            saf afdsfsafs dsfdafdasfasfsa fdsadfafdassfdsf safdasfasdfsa
            dsafasfasfsa safdasfdasfdas asdfasdfasfas asfafdas ;lkajsklfdjaskj
            dklsajfklasjfas sajfkasj alk
          </p>
        </div>
      </div>
    </div>
  );
}
