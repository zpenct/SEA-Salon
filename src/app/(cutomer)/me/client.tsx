"use client";

import React from "react";
import { Button, Flex, Space, Typography } from "antd";
import { getReservationsByEmail } from "@/app/_services";
import { useQuery } from "@tanstack/react-query";
import MyReservationsTable from "@/app/_components/reservation/myReservationsTable";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { reservetionsKey } from "@/app/constant/queryKey";

interface Props {
  userLoggedIn: any;
}

const ClientDashboard: React.FC<Props> = ({ userLoggedIn }) => {
  const email = userLoggedIn?.user?.email;

  const {
    data: myReservetions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [reservetionsKey.LIST, email],
    queryFn: () => getReservationsByEmail(email),
  });

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex align="middle" justify="space-between">
          <Typography.Title level={4} style={{ marginTop: 24 }}>
            My Latest Reservations
          </Typography.Title>
          <Button icon={<PlusOutlined />} type="primary">
            <Link href="/services">Create Reservations</Link>
          </Button>
        </Flex>
        <MyReservationsTable loading={isLoading} data={myReservetions?.items} />
      </Space>
    </div>
  );
};

export default ClientDashboard;
