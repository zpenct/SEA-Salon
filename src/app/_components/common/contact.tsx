import Image from "next/image";
import { Button, Flex, Space } from "antd";
import { PhoneFilled } from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
  padding: "24px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "966px",
  margin: "10px auto",
};

export default function Contact() {
  return (
    <>
      <div style={contentStyle}>
        <Space direction="vertical">
          <h3>Contact Us</h3>

          <Space direction="vertical">
            <p>
              <span
                style={{
                  color: "#6155A6",
                  background: "#E7E7FF",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                }}
              >
                <PhoneFilled />
              </span>
              Thomas: 08123456789
            </p>
            <p>
              <span
                style={{
                  color: "#6155A6",
                  background: "#E7E7FF",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                }}
              >
                <PhoneFilled />
              </span>
              Sekar: 08164829372
            </p>
          </Space>
        </Space>
        <Flex
          justify="center"
          align="center"
          style={{
            fontWeight: "900",
            fontSize: "clamp(32px, 3vw, 42px)",
            maxWidth: "560px",
            color: "#6155A6",
          }}
        >
          <h3>Lets talk</h3>
        </Flex>
      </div>
    </>
  );
}
