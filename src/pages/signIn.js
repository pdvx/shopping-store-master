import React, { useState } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const AppSignin = ({ token, setToken }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const n = useNavigate();
  const loginHandle = (e) => {
    axios({
      url: "http://localhost:8765/auth/login",
      method: "POST",
      data: {
        username: e.username,
        password: e.password,
      },
    }).then((res) => {
      if (res) {
        console.log(res);
        sessionStorage.setItem("userToken", res.data.token);
        sessionStorage.setItem("userName", e.username);
        n("/demo/react/antdesign/grocery/");
      } else {
        setError("Login k thanh cong");
      }
    });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Form
        style={{ width: "70%", margin: "0 auto" }}
        name="normal_login"
        className="login-form"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={loginHandle}
      >
        <Form.Item
          style={{ justifyContent: "center", display: "flex" }}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          style={{ justifyContent: "center", display: "flex" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item style={{ justifyContent: "center", display: "flex" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          Or
          <NavLink to={`/demo/react/antdesign/grocery/signup`} style={{ marginLeft: "5px" }}>
            Register now
          </NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppSignin;
