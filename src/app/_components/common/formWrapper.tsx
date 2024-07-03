import React from "react";
import { Col, Row, Space } from "antd";
import Image from "next/image";

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<Props> = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Row style={{ width: "100dwh", height: "95dvh" }}>
      <Col xs={{ span: 0 }} md={{ span: 12 }} style={{ height: "100%" }}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="avatar"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>
      <Col
        xs={{ span: 0 }}
        md={{ span: 12 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          width: "100%",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Space direction="vertical">
          <div style={{ marginBottom: 20 }}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          {children}
        </Space>
      </Col>
    </Row>
  </div>
);

export default FormWrapper;
