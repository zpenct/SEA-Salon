import { Space } from "antd";
import Jumbotron from "./_components/common/jumbotron";
import Services from "./_components/common/services";
import Contact from "./_components/common/contact";

export default function Home() {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={32}>
      <Jumbotron />
      <Services />
      <Contact />
    </Space>
  );
}
