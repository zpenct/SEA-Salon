"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  BranchesOutlined,
  DashboardOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

import Link from "next/link";

const { Content, Footer, Sider } = Layout;

const menuitems = [
  {
    key: "1",
    label: "Main",
    icon: <DashboardOutlined />,
  },
  {
    key: "3",
    label: <Link href="/me/profile">Profile</Link>,
    icon: <ProfileOutlined />,
  },
];

interface Props {
  children: React.ReactNode;
}
const LayoutDashboardAdmin: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  if (pathname === "/dashboard/branches/new") return <>{children}</>;
  return (
    <>
      <Layout>
        <Sider
          style={{ padding: 8 }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuitems}
          />
        </Sider>
        <Layout>
          <Content
            style={{ margin: "16px 0", minHeight: "100dvh", width: "100%" }}
          >
            <main style={{ padding: 24 }}>{children}</main>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutDashboardAdmin;
