import React from "react";
import { Flex, Typography } from "antd";
const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: "100%" }}>
    <Typography.Title
      type="secondary"
      level={5}
      style={{ whiteSpace: "nowrap", color: "white" }}
    >
      Panel {props.text}
    </Typography.Title>
  </Flex>
);
export default Desc;
