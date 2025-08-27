import React from 'react'
import {  Layout } from 'antd';
const {  Footer } = Layout;

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const AppFooter = () => {
  return (
    <Footer style={footerStyle}>Footer</Footer>
  )
}

export default AppFooter