"use client";

import React from "react";
import { Card, List, Space, Button, Row, Col } from "antd";
import Image from "next/image";
import useScreenSize from "@/app/_hooks/useScreen";
import { mobileScreen } from "@/app/constant";
import {
  CheckOutlined,
  DollarOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useIsMobileScreen } from "@/app/utils";

interface Props {
  index: number;
  title?: string | React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  image: string;
  backgroundGradient?: string;
  path: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space size={4}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ServiceItem: React.FC<Props> = ({
  title,
  description,
  children,
  style,
  image,
  backgroundGradient,
  path,
}) => {
  const isMobileScreen = useIsMobileScreen();

  return (
    <Row
      style={{
        width: "100%",
        maxWidth: 966,
        padding: 8,
        flexWrap: isMobileScreen ? "wrap" : "nowrap",
        background: "white",
        borderRadius: 8,
        ...style,
      }}
    >
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Image
          width={300}
          height={300}
          style={{
            width: isMobileScreen ? "100%" : 300,
            objectFit: "cover",
            background: backgroundGradient,
            borderRadius: 4,
          }}
          alt="avatar"
          src={image}
        />
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 16 }}
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ fontSize: "clamp(1.8rem, 2.0vw, 2.5rem)" }}>{title}</h3>
          <p
            style={{
              fontSize: "clamp(.8rem, 1.2vw, 1.7rem)",
              marginTop: 8,
              color: "#838383",
            }}
          >
            {description}
          </p>
        </div>

        <Row
          gutter={[16, 16]}
          justify={"space-between"}
          align={"middle"}
          style={{ marginTop: 16 }}
        >
          <Col>
            <Space size={16} style={{ color: "#838383" }}>
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />
            </Space>
          </Col>

          <Col>
            <Button type="primary">
              <Link href={path}>Book Now!</Link>
            </Button>
          </Col>
        </Row>
      </Col>
      {children}
    </Row>
  );
};

export default ServiceItem;
