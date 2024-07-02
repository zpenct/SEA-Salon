"use client";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  PhoneOutlined,
  MenuOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import useScreenSize from "@/app/_hooks/useScreen";
import { mobileScreen } from "@/app/constant";
import { useIsMobileScreen } from "@/app/utils";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Services",
    key: "services",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    label: <Link href="/feedback">Feedback</Link>,
    key: "Feedback",
    icon: <MessageOutlined />,
  },
  {
    label: "Contact Us",
    key: "Contact",
    icon: <PhoneOutlined />,
  },
];

const NavLinks: React.FC = () => {
  const [current, setCurrent] = useState("");
  const isMobile = useIsMobileScreen();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      disabledOverflow={!isMobile}
      overflowedIndicator={<MenuOutlined />}
    />
  );
};

export default NavLinks;
