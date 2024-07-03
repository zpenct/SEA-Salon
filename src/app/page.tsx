import { Space } from "antd";
import Jumbotron from "./_components/common/jumbotron";
import Services from "./_components/common/services";
import Contact from "./_components/common/contact";

const Page: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={32}>
      <Jumbotron />
      <Services />
      <Contact />
    </Space>
  );
};

export default Page;
