import { CoolMode } from "../components/magicui/BaseParticle";
import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";
import { BorderBeam } from "../components/magicui/BorderBeam";
import { Splitter } from "antd";
import { HiRefresh } from "react-icons/hi";
import Desc from "../components/Desc";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loader";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
interface ItemType {
  id: number;
  color: string;
  state: boolean;
  type: string;
  like: boolean;
}
function Home() {
  const [myData, setMyData] = useState<ItemType[]>([]);
  const [loadings, setLoadings] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["data"],
    queryFn: async (): Promise<any> => {
      try {
        const ress = await fetch("http://localhost:4000/", {
          credentials: "include",
        });
        if (ress.ok) {
          const result = await ress.json();
          setMyData(result);
          return result;
        }
      } catch (err) {
        console.log("error Feaching");
      }
    },
  });
  async function toggleLock(id: number) {
    try {
      const ress = await fetch(
        `http://localhost:4000/item/${id}?element=state`,
        {
          credentials: "include",
        }
      );
      if (ress.ok) {
        setMyData((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, state: !item.state } : item
          )
        );
      }
    } catch (err) {
      console.log("error Feaching");
    }
  }
  async function toggleLike(id: number) {
    try {
      const ress = await fetch(
        `http://localhost:4000/item/${id}?element=like`,
        {
          credentials: "include",
        }
      );
      if (ress.ok) {
        setMyData((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, like: !item.like } : item
          )
        );
      }
    } catch (err) {
      console.log("error Feaching");
    }
  }
  async function reGenerate() {
    setLoadings(true);
    try {
      const ress = await fetch(`http://localhost:4000/regenerate`, {
        credentials: "include",
      });
      if (ress.ok) {
        const data = await ress.json();
        setTimeout(async () => {
          if (await data) {
            setMyData(data);
            setLoadings(false);
          }
        }, 2000);
      }
    } catch (err) {
      console.log("error Feaching");
    }
  }
  async function handleCodeChange(id: number, to: string) {
    try {
      const ress = await fetch(`http://localhost:4000/item/${id}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ to: to }),
      });
      if (ress.ok) {
        const data = await ress.json();

        setMyData((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, color: data[id]["color"] } : item
          )
        );
        console.log(data[id]["color"]);
      }
    } catch (err) {
      console.log("error Feaching");
    }
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
  useEffect(() => {
    console.log("effect");
  }, []);

  return query.isLoading ? (
    <Loading />
  ) : (
    <div className="">
      <div className="gap-y-16 relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl">
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
        <div className="container text-white">
          <Splitter
            className="rounded-xl overflow-hidden	mx-auto"
            style={{
              height: 200,
              width: "100%",
            }}
          >
            {myData.map((ele: any) => (
              <Splitter.Panel collapsible={{ start: true }} key={ele.id}>
                <Desc
                  data={ele}
                  toggleLock={toggleLock}
                  toggleLike={toggleLike}
                  handleCodeChange={handleCodeChange}
                  notify={notify}
                />
              </Splitter.Panel>
            ))}
          </Splitter>
        </div>
        <div className="relative justify-center">
          <CoolMode
            options={{
              size: 15,
            }}
          >
            <button
              className="flex items-center justify-between rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              onClick={reGenerate}
            >
              Generate
              <HiRefresh
                className={` h-4 w-4 ml-3 ${loadings && "animate-spin"}`}
              />
            </button>
          </CoolMode>
        </div>
      </div>
    </div>
  );
}

export default Home;
