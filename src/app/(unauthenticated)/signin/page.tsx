import React from "react";
import AuthWrapper from "../../_components/common/formWrapper";
import SignInForm from "../../_components/auth/formSignin";

const Page: React.FC = () => {
  return (
    <AuthWrapper
      title="Sign In First!"
      description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
    >
      <SignInForm />
    </AuthWrapper>
  );
};

export default Page;
