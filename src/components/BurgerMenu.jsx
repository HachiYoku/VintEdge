import React from "react";
import {
  FieldTimeOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { TfiMenu } from "react-icons/tfi";
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "/",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "/create-item",
    label: "Create Item",
    icon: <PlusSquareOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "/history",
    label: "History",
    icon: <FieldTimeOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "/setting",
    label: "Settings",
    icon: <SettingOutlined />,
  },
];
const BurgerMenu = ({ iconStyle }) => {
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <Button type="text" icon={<TfiMenu style={iconStyle} />} />
    </Dropdown>
  );
};
export default BurgerMenu;
