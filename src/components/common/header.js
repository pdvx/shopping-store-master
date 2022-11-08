import { NavLink,useNavigate } from "react-router-dom";
import { Button, Drawer, Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";
import {
  MobileOutlined,
  MailOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  UserOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";

function AppHeader() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("userToken")
const user = sessionStorage.getItem("userName")
  const handleLogout =  () => {
    
    sessionStorage.clear()
    navigate('/demo/react/antdesign/grocery/signin');
    console.log('You are logged out')
    
    
};

  return (
    <div className="container">
      {/* topbar */}
      <div className="topBar">
        <div className="contactInfo">
          <ul>
            <li>
              <a href="tel:0383440307">
                <MobileOutlined /> <span>0383440307</span>
              </a>
            </li>
            <li>
              <a href="mailto:vphm910@gmail.com">
                <MailOutlined /> <span>vphm910@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="otherInfo">
          <ul className="socialMedia">
            <li>
              <a href="https://www.facebook.com/pdvx.03.07">
                <FacebookFilled />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <TwitterSquareFilled />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/just.t.o.m">
                <InstagramFilled />
              </a>
            </li>
          </ul>
          <Dropdown
            onClick={(e) => e.preventDefault()}
            className="user-btn"
            overlay={!isLogin?<Menu
              items={[  
                {
                  label: <NavLink to={`/demo/react/antdesign/grocery/signin`}>Sign in</NavLink>,
                  key: "0",
                },
              ]}
            />:<Menu
            items={[  
              {
                label: <a href="https://www.aliyun.com">{user}</a>,
                key: "1",
              },
              {
                type: "divider",
              },
              {
                label: <button onClick={handleLogout} className='border px-6 py-2 my-4'>
                Logout
              </button>,
                key: "2",
              },
            ]}
          />}
            trigger={["click"]}
          >
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
      {/* header */}
      <div className="header separator">
        <div className="logo">
          Shopping Store <ShoppingCartOutlined />
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer placement="right" onClose={onClose} visible={visible}>
            <nav>
              <ul>
                <li>
                  <NavLink
                    onClick={onClose}
                    to="/demo/react/antdesign/grocery/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={onClose}
                    to="/demo/react/antdesign/grocery/about"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={onClose}
                    to="/demo/react/antdesign/grocery/shop"
                  >
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={onClose}
                    to="/demo/react/antdesign/grocery/faq"
                  >
                    FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={onClose}
                    to="/demo/react/antdesign/grocery/contact"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Drawer>
        </div>
        <nav className="mobileHidden">
          <ul>
            <li>
              <NavLink to="/demo/react/antdesign/grocery/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/demo/react/antdesign/grocery/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/demo/react/antdesign/grocery/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/demo/react/antdesign/grocery/faq">FAQ</NavLink>
            </li>
            <li>
              <NavLink to="/demo/react/antdesign/grocery/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AppHeader;
