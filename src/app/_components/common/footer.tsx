import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const MyFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      SEA Salon ©{new Date().getFullYear()} Created by Zpenct
    </Footer>
  );
};

export default MyFooter;
