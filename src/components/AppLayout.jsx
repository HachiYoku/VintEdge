import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import { Flex, Layout } from 'antd';
import AppFooter from './AppFooter';
import { Outlet } from 'react-router-dom';
import axios from 'axios';




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

  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('https://dummyjson.com/products')
    .then(function (response) {
      // handle success
      console.log(response.data.products);
      setProducts(response.data.products)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    })
    }, []);


  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <AppHeader />
        <Content style={contentStyle}>
          <Outlet context={{ products }} />
        </Content>
        <AppFooter />
      </Layout>
    </Flex>
  )
}

export default AppLayout