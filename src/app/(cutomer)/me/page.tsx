import React from "react";
import { message } from "antd";
import CustomerTable from "@/app/_components/customer/reservationsTable";
import {
  getTotalReviews,
  getAllCustomer,
  getTotalBranches,
  getAllReviews,
} from "@/app/_services";
import { useSession } from "next-auth/react";
import ClientDashboard from "./client";
import { auth } from "../../../../auth";

const Page: React.FC = async () => {
  const data = await auth();
  return (
    <>
      <ClientDashboard userLoggedIn={data} />
    </>
  );
};

export default Page;
