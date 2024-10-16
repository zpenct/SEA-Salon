import React from "react";
import { FormBranch } from "@/app/_components/branch/formBranch";
import FormWrapper from "@/app/_components/common/formWrapper";

const Page = () => {
  return (
    <FormWrapper
      title="New Branch"
      description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
    >
      <FormBranch />
    </FormWrapper>
  );
};

export default Page;
