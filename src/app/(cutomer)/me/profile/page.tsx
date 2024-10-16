import React from "react";
import { Avatar, Card, Flex, Skeleton, Space } from "antd";
import { auth } from "../../../../../auth";
import Meta from "antd/es/card/Meta";

const Page: React.FC = async () => {
  const data = await auth();

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

export default Page;
