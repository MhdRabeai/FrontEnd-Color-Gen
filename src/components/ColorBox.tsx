import { Dropdown, MenuProps } from "antd";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import { GoCopy } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
// import copy from "copy-to-clipboard";
// import { Bounce, toast } from "react-toastify";

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
  notify: Function;
  toggleLike: Function;
  handleCodeChange: Function;
}

const ColorBox: React.FC<ItemType> = (props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          className="text-xs"
          onClick={() => props.handleCodeChange(props.code, "hex")}
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
          onClick={() => props.handleCodeChange(props.code, "hsl")}
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
          onClick={() => props.handleCodeChange(props.code, "rgb")}
        >
          RGB
        </button>
      ),
    },
  ];
  return (
    <div className="box-container basis-11/12 md:basis-5/12 lg:basis-96		 ">
      <div className="palette">
        {props.palette.map((ele) => (
          <div
            key={ele.id}
            style={{ background: `${ele.color}` }}
            className="color"
          >
            {ele.type !== "hex" ? (
              <span
                className="text-xs cursor-pointer"
                onClick={() => props.notify(ele.color)}
              >
                {ele.color}
              </span>
            ) : (
              <span
                className="text-md cursor-pointer"
                onClick={() => props.notify(ele.color)}
              >
                {ele.color}
              </span>
            )}
          </div>
        ))}
      </div>
      <div id="stats">
        <div>
          <p>Code: {props.code}</p>
          <p>Name: {props.paletteName}</p>
        </div>
        <div className="flex gap-2">
          <button>
            {props.like ? (
              <FaHeart
                className="fill-[#ff0033bd] hover:fill-[#ff0033]"
                onClick={() => props.toggleLike(props.code)}
              />
            ) : (
              <FaRegHeart
                className="fill-[#666] hover:fill-[#999]"
                onClick={() => props.toggleLike(props.code)}
              />
            )}
          </button>
          <Link to={`/palettes/${props.code}`}>
            <FaLink className="fill-[#666] hover:fill-[#999]" />
          </Link>
          <Dropdown menu={{ items }} placement="bottom" arrow className="dark">
            <IoMdSettings className="fill-[#666] hover:fill-[#999]" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
