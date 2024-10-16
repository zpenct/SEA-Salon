"use client";

import React from "react";
import { Col, Row, Statistic, Card, Space, Typography } from "antd";
import CustomerTable from "@/app/_components/reservation/reservationsTable";
import {
  getTotalReviews,
  getAllCustomer,
  getTotalBranches,
  getAllReviews,
} from "@/app/_services";
import { useQueries } from "@tanstack/react-query";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import {
  branchesKey,
  reservetionsKey,
  reviewsKey,
} from "@/app/_constant/queryKey";

const ClientDashboard: React.FC = () => {
  const [totalRewivesQuery, reviewsQuery, customersQuery, totalBranchesQuery] =
    useQueries({
      queries: [
        {
          queryKey: [reviewsKey.TOTAL],
          queryFn: getTotalReviews,
        },
        {
          queryKey: [reviewsKey.LIST],
          queryFn: getAllReviews,
        },
        {
          queryKey: [reservetionsKey.LIST],
          queryFn: getAllCustomer,
        },
        {
          queryKey: [branchesKey.LIST],
          queryFn: getTotalBranches,
        },
      ],
    });
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <Card>
              <Statistic
                title="Total Orders"
                value={customersQuery?.data?.items.length}
                loading={customersQuery.isLoading}
              />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <Card>
              <Statistic
                title="Branches"
                value={totalBranchesQuery?.data?.data}
                loading={totalBranchesQuery.isLoading}
              />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
            <Space>
              <Card>
                <Statistic
                  title="Good Rating (Rated 3.0 and above)"
                  value={totalRewivesQuery?.data?.data?.goodReviews}
                  loading={totalRewivesQuery.isLoading}
                  suffix={`/ ${totalRewivesQuery?.data?.data?.totalReviews}`}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<LikeFilled />}
                />
              </Card>
              <Card>
                <Statistic
                  title="Bad Rating (Rated below 3.0)"
                  value={totalRewivesQuery?.data?.data?.badReviews}
                  loading={totalRewivesQuery.isLoading}
                  suffix={`/ ${totalRewivesQuery?.data?.data?.totalReviews}`}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<DislikeFilled />}
                />
              </Card>
            </Space>
          </Col>
        </Row>
        <Typography.Title level={4} style={{ marginTop: 24 }}>
          Customers
        </Typography.Title>
        <Typography.Text type="secondary">
          The latest reservations
        </Typography.Text>
        <CustomerTable
          loading={customersQuery.isLoading}
          data={customersQuery?.data?.items}
        />
      </Space>
    </div>
  );
};

export default ClientDashboard;
