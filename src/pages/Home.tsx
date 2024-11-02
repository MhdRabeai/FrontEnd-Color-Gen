import { CoolMode } from "../components/magicui/BaseParticle";
import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";

import { BorderBeam } from "../components/magicui/BorderBeam";
import { Splitter } from "antd";
import Desc from "../components/Desc";

function Home() {
  return (
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
        <div className="container text-white">
          <Splitter
            style={{
              height: 200,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Splitter.Panel collapsible={{ start: true }}>
              <Desc text={1} />
            </Splitter.Panel>
            <Splitter.Panel collapsible={{ start: true }}>
              <Desc text={2} />
            </Splitter.Panel>
            <Splitter.Panel collapsible={{ start: true }}>
              <Desc text={3} />
            </Splitter.Panel>
            <Splitter.Panel collapsible={{ end: true }}>
              <Desc text={4} />
            </Splitter.Panel>
            <Splitter.Panel collapsible={{ end: true }}>
              <Desc text={5} />
            </Splitter.Panel>
          </Splitter>
        </div>
        <div className="relative justify-center">
          <CoolMode
            options={{
              size: 15,
            }}
          >
            <button className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Click Me!
            </button>
          </CoolMode>
        </div>
      </div>
    </div>
  );
}

export default Home;
