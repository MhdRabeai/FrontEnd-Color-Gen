import { CoolMode } from "../components/magicui/BaseParticle";
import DotPattern from "../components/magicui/DotPattern";
import { cn } from "../lib/utils";
import { BorderBeam } from "../components/magicui/BorderBeam";
import {
  Flex,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Splitter,
  Form,
  Button,
} from "antd";
import { HiRefresh } from "react-icons/hi";
import { IoSaveOutline } from "react-icons/io5";
import Desc from "../components/Desc";
// import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loader";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
// import {toggleLock} from '../functions/SharedFunctions'
interface ItemType {
  id: number;
  color: string;
  state: boolean;
  type: string;
  like: boolean;
}
type FieldType = {
  paletteName?: string;
};
function Home() {
  const navigate = useNavigate();
  const [myData, setMyData] = useState<ItemType[]>([]);
  const [loadings, setLoadings] = useState<boolean>(false);
  const [loadCompo, setLoadCompo] = useState<boolean>(true);
  const [tabActive, setTabActive] = useState<string>("random");
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function toggleLock(id: number) {
    try {
      const response = await fetch(
        `http://localhost:4000/item/${id}?element=state`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setMyData((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, state: !item.state } : item
          )
        );
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }

  async function reGenerate() {
    setLoadings(true);
    try {
      const response = await fetch(
        `https://backnd-color-gen.onrender.com/regenerate?tab=${tabActive}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTimeout(async () => {
          if (await data) {
            setMyData(data["randomFive"]);
            setLoadings(false);
          }
        }, 2000);
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }
  async function handleCodeChange(id: number, to: string) {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/item/${id}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ to: to }),
      });
      if (response.ok) {
        const data = await response.json();

        setMyData((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, color: data[id]["color"] } : item
          )
        );
        console.log(data[id]["color"]);
      }
    } catch (err) {
      console.log("error Fetching");
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
  function handleChangeColor(id: number, newColor: string) {
    setMyData((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, color: newColor } : item
      )
    );
  }
  async function handleOnChange(e: RadioChangeEvent) {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ method: e.target.value }),
      });
      if (response.ok) {
        const data = await response.json();
        setTabActive(e.target.value);
        setMyData(data["randomFive"]);
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }
  async function handleInit() {
    try {
      const response = await fetch("https://backnd-color-gen.onrender.com/", {
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setTabActive(!result["type"] ? "random" : result["type"]);
        setMyData(result["randomFive"]);

        return result;
      }
    } catch (err) {
      console.log("error Fetching");
    }
  }
  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e: any) => {
    try {
      const response = await fetch(`https://backnd-color-gen.onrender.com/palettes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ paletteName: e.paletteName, palette: myData }),
      });
      if (response.ok) {
        const code = await response.json();
        toast.success(`Your Palette's been Saved!`, {
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
        setIsModalOpen(false);
        setTimeout(() => {
          navigate(`/palettes/${code["code"]}`);
        }, 3000);
      }
    } catch (err) {
      console.log("error Sending");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  setTimeout(() => {
    setLoadCompo(false);
  }, 2000);
  useEffect(() => {
    handleInit();
    console.log("effect");
  }, []);

  // return query.isLoading ? (
  return loadCompo ? (
    <Loading />
  ) : (
    <div className="">
      <div className="gap-y-16 relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl py-20">
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
          <Flex vertical gap="middle" className="mx-auto w-fit	">
            <Radio.Group onChange={handleOnChange} defaultValue={tabActive}>
              <Radio.Button className=" font-mono" value="random">
                Random
              </Radio.Button>
              <Radio.Button value="monochrome" className=" font-mono">
                Monochrome
              </Radio.Button>
              <Radio.Button value="additional" className=" font-mono">
                Additional
              </Radio.Button>
              <Radio.Button value="triadic" className=" font-mono">
                Triadic
              </Radio.Button>
              <Radio.Button value="quadratic" className=" font-mono">
                Quadratic
              </Radio.Button>
            </Radio.Group>
          </Flex>
        </div>
        <div className="container text-white ">
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
                  handleCodeChange={handleCodeChange}
                  notify={notify}
                  handleChangeColor={handleChangeColor}
                  tabActive={tabActive}
                />
              </Splitter.Panel>
            ))}
          </Splitter>
        </div>
        <Flex className="relative justify-center gap-3">
          <button
            className="flex items-center justify-between rounded-xl text-sm font-normal		 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#bbbbbb] text-primary-foreground shadow hover:bg-primary/90 h-9 px-5 py-3 font-mono"
            onClick={showModal}
          >
            Save A Palette
            <IoSaveOutline className="ml-3" />
          </button>
          <Modal
            title="Save A Palette"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={() => <></>}
          >
            <Form
              name="basic"
              layout={"vertical"}
              style={{ maxWidth: 600 }}
              onFinish={handleOk}
            >
              <Form.Item<FieldType>
                name="paletteName"
                label="Enter Palette Name"
                rules={[{ required: true, message: "Please input a Name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 14, span: 10 }} className="m-0">
                <Button
                  type="primary"
                  htmlType="button"
                  className="mr-2 cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="ok">
                  OK
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <CoolMode
            options={{
              size: 15,
            }}
          >
            <button
              className="flex items-center justify-between rounded-xl text-sm font-normal		 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#bbbbbb] text-primary-foreground shadow hover:bg-primary/90 h-9 px-5 py-3 font-mono"
              onClick={reGenerate}
            >
              ReGenerate
              <HiRefresh
                className={` h-4 w-4 ml-3 ${loadings && "animate-spin"}`}
              />
            </button>
          </CoolMode>
        </Flex>
      </div>
    </div>
  );
}

export default Home;
