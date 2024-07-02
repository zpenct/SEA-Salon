import React from "react";
import FormFeedback from "../../_components/feedback/formFeedback";
import FormWrapper from "@/app/_components/common/formWrapper";

const page = () => {
  return (
    <>
      <FormWrapper
        title="Feedback"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
      >
        <FormFeedback />
      </FormWrapper>
    </>
  );
};

export default page;
