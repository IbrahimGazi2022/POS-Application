import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../resourses/layout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  UploadOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // set data to localstorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">  </span>
          </div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/home">Home</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/bills">bills</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link to="/items">Items</Link>,
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: <Link to="/customers">Customers</Link>,
            },
            {
              key: "5",
              icon: <LoginOutlined />,
              label: <Link to="/logout">Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 0 3px #ccc",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              <h4 className="mt-3 mr-2">
                {cartItems.length}
                <ShoppingCartOutlined />
              </h4>
            </b>
          </div>
        </Header>
        <Content
          style={{
            margin: "10px 10px 0 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
