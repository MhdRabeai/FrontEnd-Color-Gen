import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";

import { BorderBeam } from "../components/magicui/BorderBeam";
import { useState } from "react";
import Loading from "../components/Loader";

const ByCode = () => {
  const [loadCompo, setLoadCompo] = useState<boolean>(true);
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);
  return loadCompo ? (
    <Loading />
  ) : (
    <div className=" ">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl py-20">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,#fff,transparent)]"
          )}
        />

        <BorderBeam
          size={250}
          duration={12}
          delay={0}
          borderWidth={2.5}
          colorFrom="#ffaa40"
          colorTo="#9c40ff"
        />
        <div className="container">
          <div className="row flex flex-wrap items-center justify-center lg:justify-between gap-5 lg:gap-3">
            <div className="box basis-11/12 md:basis-5/12 lg:basis-80 hover:shadow-33xl  boxShadow-33xl">
              <div className="clr"></div>
              <div className="text opacity-0 hover:opacity-100">
                Hello There
              </div>
              <div className="Btns"></div>
            </div>
            <div className="box basis-11/12 md:basis-5/12 lg:basis-80">
              <div className=""></div>
              <div className="text opacity-0 hover:opacity-100">
                Hello There
              </div>
              <div className="Btns"></div>
            </div>
            <div className="box basis-11/12 md:basis-5/12 lg:basis-80">
              <div className=""></div>
              <div className="text opacity-0 hover:opacity-100">
                Hello There
              </div>
              <div className="Btns"></div>
            </div>
            <div className="box basis-11/12 md:basis-5/12 lg:basis-80">
              <div className=""></div>
              <div className="text opacity-0 hover:opacity-100">
                Hello There
              </div>
              <div className="Btns"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByCode;
