import React, { useState } from 'react';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

import '@firebase/auth';
import { auth } from '../firebase';

const AppSignin = ({ token, setToken }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const n = useNavigate();
  const loginHandle = (e) => {
    axios({
      url: 'http://localhost:8765/auth/login',
      method: 'POST',
      data: {
        username: e.username,
        password: e.password,
      },
    }).then((res) => {
      if (res) {
        sessionStorage.setItem('userToken', res.data.token);
        sessionStorage.setItem('userName', e.username);
        sessionStorage.setItem('userId', res.data.id);
        n('/demo/react/antdesign/grocery/');
      } else {
        setError('Login k thanh cong');
      }
    });
  };

  const fbLogin = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const { accessToken, displayName, email } = result?.user || {};
      if (!accessToken) return alert('Data không hợp lệ');

      const [firstname, lastname] = displayName.split(' ');
      const loginForm = {
        firstname,
        lastname,
        username: email,
        firebaseToken: accessToken,
      };
      const { data: res } = await axios({
        url: 'http://localhost:8765/auth/login',
        method: 'POST',
        data: loginForm,
      });

      sessionStorage.setItem('userToken', res.token);
      sessionStorage.setItem('userName', email);
      sessionStorage.setItem('userId', res.userInfo.id);
      n('/demo/react/antdesign/grocery/');
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div style={{ marginTop: '50px' }}>
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={fbLogin}
          className="shadow-lg rounded px-3 py-2 text-white bg-blue-800 hover:bg-blue-900 flex justify-center items-center transition-all"
        >
          <img
            src="facebook.png"
            alt="FB"
            className="h-6 border-2 border-white rounded-full mr-4"
          />
          Login by Facebook
        </button>
      </div>
      <Form
        style={{ width: '70%', margin: '0 auto' }}
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
          style={{ justifyContent: 'center', display: 'flex' }}
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          style={{ justifyContent: 'center', display: 'flex' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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

        <Form.Item style={{ justifyContent: 'center', display: 'flex' }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          Or
          <NavLink
            to={`/demo/react/antdesign/grocery/signup`}
            style={{ marginLeft: '5px' }}
          >
            Register now
          </NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppSignin;
