import React from "react";
import AuthWrapper from "../../_components/common/formWrapper";
import SignInForm from "../../_components/auth/formSignin";
import { Flex } from "antd";

const App: React.FC = () => {
  return (
    <>
      <AuthWrapper
        title="Sign In First!"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
      >
        <SignInForm />
      </AuthWrapper>
    </>
  );
};

export default App;
