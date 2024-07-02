"use client";

import React from "react";
import { Space, Typography } from "antd";
import { getReservationsByEmail } from "@/app/_services";
import { useQuery } from "@tanstack/react-query";
import MyReservationsTable from "@/app/_components/customer/myReservationsTable";

interface Props {
  children?: React.ReactNode;
  userLoggedIn: any;
}

const ClientDashboard: React.FC<Props> = ({ userLoggedIn }) => {
  const email = userLoggedIn?.user?.email;

  const {
    data: myReservetions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reservations", userLoggedIn?.email],
    queryFn: () => getReservationsByEmail(email),
  });

  return (
    <>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={4} style={{ marginTop: 24 }}>
            My Latest Reservations
          </Typography.Title>
          <MyReservationsTable
            loading={isLoading}
            data={myReservetions?.items}
          />
        </Space>
      </div>
    </>
  );
};

export default ClientDashboard;
