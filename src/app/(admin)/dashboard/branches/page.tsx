"use client";

import React from "react";
import { Button, Flex, Typography } from "antd";

import BranchesTable from "@/app/_components/branch/branchTable";
import { getAllBranches } from "@/app/_services";
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTE } from "@/app/_constant/route";
import { branchesKey } from "@/app/_constant/queryKey";

const Page: React.FC = () => {
  const {
    data: branchData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [branchesKey.LIST],
    queryFn: getAllBranches,
  });

  if (isError) return <div>Error</div>;

  return (
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
          <Link href={ROUTE.NEW_BRANCH}>Add Branch</Link>
        </Button>
      </Flex>
      <BranchesTable loading={isLoading} data={branchData?.items} />
    </div>
  );
};

export default Page;
