"use client";

import React, { useState } from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpApi } from "@/app/_services";
import { useMutation } from "@tanstack/react-query";
import { ROUTE } from "@/app/_constant/route";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Successfully created account!",
      });

      router.push(ROUTE.SIGNIN);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Something went wrong. Please try again.",
      });
    },
  });

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      signUpMutation.mutate(values);
    } catch (error: any) {
      messageApi.open({
        duration: 6,
        type: "error",
        content: error.message,
      });
    } finally {
      setIsLoading(false);
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
            Sign Up
          </Button>
          Or <Link href={ROUTE.SIGNIN}>Sign In!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpForm;
