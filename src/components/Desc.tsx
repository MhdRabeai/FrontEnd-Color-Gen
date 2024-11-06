import React from "react";
import { Flex, Typography } from "antd";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { ColorPicker } from "antd";

const Desc: React.FC<
  Readonly<{
    data?: any | undefined;
    toggleLock?: Function | any;
    handleCodeChange?: Function | any;
    notify?: Function | any;
    handleChangeColor?: Function | any;
    tabActive?: string | any;
  }>
> = (props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className="text-xs"
          onClick={() => props.handleCodeChange(props.data.id, "hex")}
        >
          HEX
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="text-xs"
          onClick={() => props.handleCodeChange(props.data.id, "hsl")}
        >
          HSL
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          className="text-xs"
          onClick={() => props.handleCodeChange(props.data.id, "rgb")}
        >
          RGB
        </button>
      ),
    },
  ];

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        borderRadius: "15px",
      }}
      className="relative h-full overflow-hidden"
    >
      <div
        className={`transition  h-full w-full flex justify-center items-center `}
        style={{ backgroundColor: props.data.color }}
      >
        <Typography.Title
          type="secondary"
          level={5}
          style={{ whiteSpace: "nowrap", color: "white" }}
          className="font-mono text-center"
        >
          <button onClick={() => props.notify(props.data.color)}>
            {props.data.color}
          </button>
        </Typography.Title>
      </div>

      <div className="absolute w-full bg-[#242424] bottom-0 left-0 p-3 flex items-center justify-evenly">
        {props.tabActive === "random" ? (
          <button>
            {props.data.state ? (
              <FaLockOpen
                className="fill-[#777] hover:fill-[#fff]"
                onClick={() => props.toggleLock(props.data.id)}
              />
            ) : (
              <FaLock
                className="fill-[#777] hover:fill-[#fff]"
                onClick={() => props.toggleLock(props.data.id)}
              />
            )}
          </button>
        ) : (
          ""
        )}

        <button>
          <GoCopy
            className="fill-[#777] hover:fill-[#fff]"
            onClick={() => props.notify(props.data.color)}
          />
        </button>

        <ColorPicker
          className="min-w-5 w-5 min-h-5 h-5 p-0 flex justify-center items-center"
          value={props.data.color}
          onChange={(e) =>
            props.handleChangeColor(props.data.id, e.toHexString())
          }
        />
        <Dropdown menu={{ items }} placement="bottom" arrow className="dark">
          <IoMdSettings className="fill-[#777] hover:fill-[#fff]" />
        </Dropdown>
      </div>
    </Flex>
  );
};
export default Desc;
