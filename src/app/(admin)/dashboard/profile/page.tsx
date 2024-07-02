import React from "react";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Flex,
  Skeleton,
  Space,
  Typography,
} from "antd";
import type { DescriptionsProps } from "antd";
import { useSession } from "next-auth/react";
import { auth } from "../../../../../auth";
import Meta from "antd/es/card/Meta";

const App: React.FC = async () => {
  const data = await auth();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Full Name",
      children: "Zhou Maomao",
    },
    {
      key: "2",
      label: "Telephone",
      children: "1810000000",
    },
    {
      key: "3",
      label: "Live",
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "4",
      label: "Remark",
      children: "empty",
    },
    {
      key: "5",
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
  ];
  return (
    <Flex justify="center" style={{ width: "100%" }} align="middle">
      <Space direction="vertical" style={{ width: "100%" }} size={16}>
        <Card style={{ width: 500, marginTop: 16 }} title="Profile">
          <Skeleton loading={!data} avatar active>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                />
              }
              title={data?.user?.full_name}
              description={
                <p>
                  {data?.user?.email} | {data?.user?.phone_number}
                </p>
              }
            />
          </Skeleton>
        </Card>
      </Space>
    </Flex>
  );
};

export default App;
