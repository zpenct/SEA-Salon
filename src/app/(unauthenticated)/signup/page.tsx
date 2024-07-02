import React from "react";
import AuthWrapper from "../../_components/common/formWrapper";
import SignUpForm from "../../_components/auth/formSignup";

const App: React.FC = () => {
  return (
    <>
      <AuthWrapper
        title="Sign Up First!"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
      >
        <SignUpForm />
      </AuthWrapper>
    </>
  );
};

export default App;
