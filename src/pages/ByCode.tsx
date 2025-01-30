import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";

import { BorderBeam } from "../components/magicui/BorderBeam";
import { useEffect, useState } from "react";
import Loading from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaCss3Alt, FaRegFilePdf, FaHeart, FaRegHeart } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// interface ItemType {
//   code: string;
//   paletteName: string;
//   palette: [
//     {
//       id: number;
//       color: string;
//       type: string;
//     }
//   ];
//   like: boolean;
// }
const ByCode = () => {
  const [loadCompo, setLoadCompo] = useState<boolean>(true);

  const { data } = usePalette();
  // const [myData, setData] = useState<ItemType[]>([]);
  let { code } = useParams();
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
  async function handleCssFile(palette: []) {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/cssFile`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(palette),
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const data = await response.json();
      console.log("data", data);
      const fileUrl = data["url"];
      const a = document.createElement("a");
      a.href = fileUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  }
  async function handlePdfFile(palette: []) {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/pdfFile`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(palette),
      });

      if (!response.ok) {
        throw new Error("Failed!!!");
      }
      const data = await response.json();
      console.log("data", data);
      const fileUrl = data["url"];
      const a = document.createElement("a");
      a.href = fileUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  }
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);
  function usePalette() {
    return useQuery({
      queryKey: ["palette"],
      queryFn: async (): Promise<any> => {
        const response = await fetch(
          `http://localhost:4000/palette/item/${code}`,
          {
            credentials: "include",
          }
        );
        const newData = await response.json();
        return newData["data"];
      },
      // refetchInterval: 5000,
      refetchIntervalInBackground: true,
    });
  }
  useEffect(() => {
    console.log("byCode");
  }, []);
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
        <div className="parent container pt-16 pb-16 rounded-2xl border-2 border-[#bbbbbb] ">
          <div className="text-white pb-8 flex justify-between">
            <p className="text-lg">Palette Name: {data?.paletteName}</p>
            <p className="text-lg">Code: {data?.code}</p>
          </div>
          <div className="row flex flex-wrap items-center justify-center gap-5 lg:gap-3 ">
            {data.palette.map((e: any) => (
              <div
                className="card-container basis-11/12 md:basis-5/12 lg:basis-96 h-[100px] "
                key={e.id}
              >
                <div className="card">
                  <div className="front-content">
                    <p
                      className={`bg-[]`}
                      style={{
                        background: `${e.color}`,
                        backgroundClip: "text",
                      }}
                    >
                      <button onClick={() => notify(e.color)}>{e.color}</button>
                    </p>
                  </div>
                  <div
                    className="content"
                    style={{
                      background: `${e.color}`,
                    }}
                  >
                    <p className="heading">
                      <button onClick={() => notify(e.color)}>{e.color}</button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row flex flex-wrap items-center justify-center gap-5 lg:gap-3 pt-10">
            <div className="card-container basis-1/3	h-[75px] ">
              <div className="card">
                <div className=" text-white h-full flex items-center justify-around">
                  <button>
                    <FaRegFilePdf
                      className="scale-150 fill-[#e2022f]"
                      onClick={() => handlePdfFile(data.palette)}
                    />
                  </button>
                  <button>
                    <FaCss3Alt
                      className="scale-150 fill-[#408ebf]"
                      onClick={() => handleCssFile(data.palette)}
                    />
                  </button>

                  {data.like ? (
                    <FaHeart className="fill-[#ff0033bd] hover:fill-[#ff0033] scale-150" />
                  ) : (
                    <FaRegHeart className="fill-[#666] hover:fill-[#999] scale-150" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByCode;
