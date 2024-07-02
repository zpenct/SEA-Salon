"use client";

import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";
import { CustomerServiceOutlined } from "@ant-design/icons";

const Error: React.FC = () => (
  <Result
    status="error"
    title="Something went wrong!"
    subTitle="Feel free to contact support."
    extra={[
      <Button type="primary" key="console">
        <Link href="/">Home Page</Link>
      </Button>,
      <Button key="buy" icon={<CustomerServiceOutlined />}></Button>,
    ]}
  ></Result>
);

export default Error;
