import React, { Suspense } from "react";
import ClientServices from "./client";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const selectedBranch = searchParams?.branch || "SEA Salon Indah";
  return (
    <>
      {/* TODO: add fallback */}
      <Suspense fallback={<div>Loading fallback...</div>}>
        <ClientServices selectedBranch={selectedBranch as string} />
      </Suspense>
    </>
  );
};

export default Page;
