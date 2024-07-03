import React from "react";
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
