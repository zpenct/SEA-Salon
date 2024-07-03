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
import { Menu, Tag } from "antd";
import Link from "next/link";
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
        label: <Tag color="gold">Popular!</Tag>,
        children: [
          {
            label: <Link href="/services">Haircut and Styling</Link>,
            key: "setting:1",
          },
          {
            label: <Link href="/services">Nail Treatments</Link>,
            key: "setting:2",
          },
          {
            label: (
              <Link href="/services">Facials and skin care treatments</Link>
            ),
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: <Tag color="green">Soon!</Tag>,
        children: [
          { label: "Complementary care", key: "setting:3" },
          { label: "Tanning", key: "setting:4" },
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
    label: <Link href="/#contact-section">Contact US</Link>,
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
