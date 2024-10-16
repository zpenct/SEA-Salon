"use client";

import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { getUserProfile } from "@/app/_services";
import { ROUTE } from "@/app/constant/route";

const SignInForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      let callbackUrl = ROUTE.DASHBOARD_ADMIN;
      const user = await getUserProfile(values.email);

      if (user.data.role === "CUSTOMER") {
        callbackUrl = ROUTE.MY_DASHBOARD;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl,
      });

      messageApi.open({
        type: "success",
        content: "Welcome back!",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Password or email is wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
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
            placeholder="email"
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

          <Link className="login-form-forgot" href={ROUTE.FORGOT_PASS}>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            Sign In
          </Button>
          Or <Link href={ROUTE.SIGNUP}>Sign Up Now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
