"use client";

import React, { useState } from "react";
import {
  PhoneOutlined,
  MenuOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Tag } from "antd";
import Link from "next/link";
import { useIsMobileScreen } from "@/app/utils";
import { ROUTE } from "@/app/_constant/route";

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
            label: <Link href={ROUTE.SERVICES}>Haircut and Styling</Link>,
            key: "setting:1",
          },
          {
            label: <Link href={ROUTE.SERVICES}>Nail Treatments</Link>,
            key: "setting:2",
          },
          {
            label: (
              <Link href={ROUTE.SERVICES}>
                Facials and skin care treatments
              </Link>
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
    label: <Link href={ROUTE.FEEDBACK}>Feedback</Link>,
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
