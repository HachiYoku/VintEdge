import React from 'react'
import {  Layout } from 'antd';
const { Header} = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: '50px',
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#7c7f6aff',
};
const AppHeader = () => {
  return (
    <Header style={headerStyle}>Header</Header>
  )
}

export default AppHeader