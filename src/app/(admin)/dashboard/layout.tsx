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
import { ROUTE } from "@/app/_constant/route";

const { Content, Sider } = Layout;

const menuitems = [
  {
    key: "1",
    label: <Link href={ROUTE.DASHBOARD_ADMIN}>Main</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "2",
    label: <Link href={ROUTE.BRANCHES_ADMIN}>Branches</Link>,
    icon: <BranchesOutlined />,
  },
  {
    key: "3",
    label: <Link href={ROUTE.PROFILE_ADMIN}>Profile</Link>,
    icon: <ProfileOutlined />,
  },
];

interface Props {
  children: React.ReactNode;
}
const LayoutDashboardAdmin: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  if (pathname === ROUTE.NEW_BRANCH) return <>{children}</>;
  return (
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
        <MyFooter />
      </Layout>
    </Layout>
  );
};

export default LayoutDashboardAdmin;
