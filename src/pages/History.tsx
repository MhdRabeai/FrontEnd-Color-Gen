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

const History = () => {
  // const navigate = useNavigate();
  const [loadCompo, setLoadCompo] = useState<boolean>(true);

  const { data } = usePalettes();
  const [myData, setData] = useState<ItemType[]>([]);
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);

  function usePalettes() {
    return useQuery({
      queryKey: ["Palettes"],
      queryFn: async (): Promise<Array<ItemType>> => {
        const response = await fetch("https://backnd-color-gen.onrender.com/palettes", {
          credentials: "include",
        });
        const newData = await response.json();
        setData(newData);
        return newData;
      },
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    });
  }
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
  async function toggleLike(code: string) {
    try {
      const response = await fetch(
        `https://backnd-color-gen.onrender.com/palettes/${code}?element=like`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setData((prevItems) =>
          prevItems.map((item) =>
            item.code === code ? { ...item, like: !item.like } : item
          )
        );
      } else {
        throw new Error("Error in Toggle Like!!!");
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }
  async function handleCodeChange(code: string, to: string) {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/palettes/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ to: to }),
      });
      if (response.ok) {
        const data = await response.json();

        setData((prevItems) =>
          prevItems.map((item) =>
            item.code === code ? { ...data["palette"] } : item
          )
        );
        console.log();
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }
  useEffect(() => {
  }, [data]);
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
          <Flex
            wrap
            gap="large"
            className="mx-auto justify-center xl:justify-between gap-10"
          >
            {myData?.map((ele) => (
              <ColorBox
                paletteName={ele.paletteName}
                like={ele.like}
                palette={ele.palette}
                code={ele.code}
                key={ele.code}
                type={""}
                notify={notify}
                toggleLike={toggleLike}
                handleCodeChange={handleCodeChange}
              />
            ))}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default History;
