import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const AppSignup = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [form] = Form.useForm();
  const n = useNavigate();

  const onFinish = (e) => {
    axios({
      url: 'http://localhost:8765/users',
      method: 'POST',
      data: {
        username: e.username,
        password: e.password,
        email: e.email,
        address: e.address,
        phone: e.phone,
      },
    }).then((res) => {
      if (res) {
        console.log(res);
        sessionStorage.setItem('userToken', res.data.token);
        sessionStorage.setItem('userName', e.username);
        n('/demo/react/antdesign/grocery/signin');
        message.success("Created new account successfully")
      } else {
      }
    }).catch(() => {
      message.error("Username had already taken")
    });
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          label="Username"
          rules={[
            {
              type: 'username',
            },
            {
              required: true,
              message: 'Please input your username',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AppSignup;
