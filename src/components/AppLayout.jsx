import React from 'react';
import AppHeader from './AppHeader';
import { App, Flex, Layout } from 'antd';
import AppFooter from './AppFooter';
import { Outlet } from 'react-router-dom';
const {  Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  minHeight: '100vh',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};


const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  // width: 'calc(50% - 8px)',
  maxWidth: '100%',
};

const AppLayout = () => {
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <AppHeader />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Flex>
  )
}

export default AppLayout