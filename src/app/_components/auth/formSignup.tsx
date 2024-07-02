"use client";

import React from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    try {
      const res = await axios.post("/api/auth/signup", {
        email: values.email,
        password: values.password,
        full_name: values.full_name,
        phone_number: values.phone_number,
        ...values,
      });

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Success",
        });

        router.push("/signin");
      }
    } catch (error: any) {
      console.log(error.message);
      messageApi.open({
        duration: 6,
        type: "error",
        content: error.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="ramos@gmail.com"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Muhammad Ramos"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          {/* NEEED MOR VALIDATION */}
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="0812121212"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Sign Up
          </Button>
          Or <Link href="/signin">Sign In!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
