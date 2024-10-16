import Image from "next/image";
import { Button, Space } from "antd";
import Link from "next/link";

const contentStyle: React.CSSProperties = {
  padding: "24px",
  minHeight: "560px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "32px",
};

export default function Jumbotron() {
  return (
    <div style={contentStyle}>
      <Space direction="vertical">
        <h3
          style={{
            fontWeight: "900",
            fontSize: "clamp(42px, 5vw, 89px)",
            maxWidth: "560px",
          }}
        >
          <span className="text-purple">Beauty</span> and{" "}
          <span className="text-dark-orange">Elegance</span>{" "}
          <span className="text-light-orange">Redefined</span>
        </h3>
        <p
          style={{
            fontSize: "16px",
            maxWidth: "500px",
            color: "#6155A6",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Button
          type="primary"
          style={{ marginTop: "32px", padding: "28px 64px" }}
        >
          <Link href={"/services"}>Book Now!</Link>
        </Button>
      </Space>
      <div>
        <Image
          src="/jumbo.png"
          alt="avatar"
          width={400}
          height={400}
          style={{ padding: 8 }}
        />
      </div>
    </div>
  );
}
