"use client";

import React from "react";
import { Button, Flex, Space, Typography } from "antd";

import BranchesTable from "@/app/_components/branch/branchTable";
import { getAllBranches } from "@/app/_services";
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const Page: React.FC = () => {
  const {
    data: branchData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
  });

  if (isError) return <div>Error</div>;

  return (
    <>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <Flex
          justify="space-between"
          align="middle"
          style={{ width: "100%", marginBottom: 24 }}
        >
          <Typography.Title level={4}>Branches</Typography.Title>

          <Button icon={<PlusOutlined />} type="primary">
            <Link href="/dashboard/branches/new">Add Branch</Link>
          </Button>
        </Flex>
        <BranchesTable loading={isLoading} data={branchData?.items} />
      </div>
    </>
  );
};

export default Page;
