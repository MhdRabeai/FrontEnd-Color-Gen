import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";

import { BorderBeam } from "../components/magicui/BorderBeam";
import Loading from "../components/Loader";
import { useState } from "react";

const History = () => {
  const [loadCompo, setLoadCompo] = useState<boolean>(true);
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);
  return loadCompo ? (
    <Loading />
  ) : (
    <div className=" ">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl">
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
      </div>
    </div>
  );
};

export default History;
