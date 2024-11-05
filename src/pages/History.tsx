import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";

import { BorderBeam } from "../components/magicui/BorderBeam";
import Loading from "../components/Loader";
import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import ColorBox from "../components/ColorBox";
import { Flex } from "antd";
import { Bounce, toast, ToastContainer } from "react-toastify";
import copy from "copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
interface ItemType {
  code: string;
  paletteName: string;
  palette: [
    {
      id: number;
      color: string;
      type: string;
    }
  ];
  type: string;
  like: boolean;
}

function usePalettes() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<ItemType>> => {
      const response = await fetch("http://localhost:4000/palettes", {
        credentials: "include",
      });
      return await response.json();
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
}
const History = () => {
  // const navigate = useNavigate();
  const [loadCompo, setLoadCompo] = useState<boolean>(true);

  const { data } = usePalettes();
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);
  useEffect(() => {
    // handleInit();

    console.log("ssss");
  }, [data]);

  function notify(color: string) {
    copy(color);
    toast.success(`Color ${color} is Copied!!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="container">
          <Flex wrap gap="large" className="mx-auto">
            {data?.map((ele) => (
              <ColorBox
                paletteName={ele.paletteName}
                like={ele.like}
                palette={ele.palette}
                code={ele.code}
                key={ele.code}
                type={""}
                notify={notify}
              />
            ))}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default History;
