import React from "react";
import { FormBranch } from "@/app/_components/branch/formBranch";
import { Space } from "antd";
import Title from "antd/es/typography/Title";
import FormWrapper from "@/app/_components/common/formWrapper";

export default function ClientNewBranch() {
  return (
    <>
      <FormWrapper
        title="New Branch"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
      >
        <FormBranch />
      </FormWrapper>
    </>
  );
}
