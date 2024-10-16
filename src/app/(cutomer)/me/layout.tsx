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
import MyFooter from "@/app/_components/common/footer";
import { ROUTE } from "@/app/constant/route";

const { Content, Sider } = Layout;

const menuitems = [
  {
    key: "1",
    label: <Link href={ROUTE.MY_DASHBOARD}>Main</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "3",
    label: <Link href={ROUTE.MY_PROFILE}>Profile</Link>,
    icon: <ProfileOutlined />,
  },
];

interface Props {
  children: React.ReactNode;
}
const LayoutDashboardCustomer: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  if (pathname === ROUTE.NEW_BRANCH) return <>{children}</>;
  return (
    <Layout>
      <Sider style={{ padding: 8 }} breakpoint="lg" collapsedWidth="0">
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
        <MyFooter />
      </Layout>
    </Layout>
  );
};

export default LayoutDashboardCustomer;
