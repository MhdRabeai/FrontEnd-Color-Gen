import React, { useRef } from "react";
import { Flex, Typography } from "antd";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { GoCopy } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

const Desc: React.FC<
  Readonly<{
    data?: any | undefined;
    toggleLock?: Function | any;
    toggleLike?: Function | any;
    handleCodeChange?: Function | any;
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
  const myRef = useRef(null);
  return (
    <Flex
      ref={myRef}
      justify="center"
      align="center"
      style={{
        height: "100%",
        backgroundColor: props.data.color,
        position: "relative",
      }}
      className="transition-colors"
    >
      <Typography.Title
        type="secondary"
        level={5}
        style={{ whiteSpace: "nowrap", color: "white" }}
        className="font-mono "
      >
        {props.data.color}
      </Typography.Title>
      <div className="absolute w-full bg-[#242424] bottom-0 left-0 p-3 flex items-center justify-evenly">
        <button className="text-red">
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
        <button>
          <GoCopy className="fill-[#777] hover:fill-[#fff]" />
        </button>
        <button>
          {props.data.like ? (
            <FaHeart
              className="fill-[#ff0033bd] hover:fill-[#ff0033]"
              onClick={() => props.toggleLike(props.data.id)}
            />
          ) : (
            <FaRegHeart
              className="fill-[#777] hover:fill-[#fff]"
              onClick={() => props.toggleLike(props.data.id)}
            />
          )}
        </button>

        <Dropdown menu={{ items }} placement="bottom" arrow className="dark">
          <IoMdSettings className="fill-[#777] hover:fill-[#fff]" />
        </Dropdown>
      </div>
    </Flex>
  );
};
export default Desc;
