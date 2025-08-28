import React from 'react';
import { FieldTimeOutlined, HomeOutlined, PlusSquareOutlined, SettingOutlined } from '@ant-design/icons';
import { TfiMenu } from "react-icons/tfi";
import { Dropdown, Menu, Space } from 'antd';
import { useNavigate } from 'react-router-dom';


const items = [
  {
    key: '/',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '/create-item',
    label: 'Create Item',
    icon: <PlusSquareOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '/history',
    label: 'History',
    icon: <FieldTimeOutlined/>,
  },
  {
    type: 'divider',
  },
  {
    key: '/setting',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];
const BurgerMenu = ({iconStyle}) => {
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Dropdown menu={{ items, onClick : onClick }} >
    <a onClick={e => e.preventDefault()}>
      <Space>
        
        <TfiMenu style={iconStyle} />
      </Space>
    </a>
  </Dropdown>
  )
};
export default BurgerMenu;