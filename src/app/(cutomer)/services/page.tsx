import React from "react";
import ClientServices from "./client";

import { Suspense } from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const selectedBranch = searchParams?.branch || "SEA Salon Indah";
  return (
    <>
      <Suspense fallback={<div>Loading fallback...</div>}>
        <ClientServices selectedBranch={selectedBranch as string} />
      </Suspense>
    </>
  );
};

export default Page;
