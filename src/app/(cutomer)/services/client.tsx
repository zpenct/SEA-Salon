"use client";

import React from "react";
import { Card, Layout, Flex, Typography, List, Tag } from "antd";
import OrderForm from "../../_components/service/formReservation";
import Image from "next/image";
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getAllBranches, getSpecificBranch } from "@/app/_services";
import { useIsMobileScreen, generateDisabledHours } from "@/app/utils";
import Meta from "antd/es/card/Meta";
import MyFooter from "@/app/_components/common/footer";

const { Title, Text } = Typography;

const bgStyle: React.CSSProperties = {
  background:
    "linear-gradient(335deg, rgba(231,227,255,1) 37%, rgba(255,255,255,1) 83%)",
  height: "120px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: -1,
};

interface Props {
  selectedBranch: string;
}
const ClientServices: React.FC<Props> = ({ selectedBranch }) => {
  const isMobile = useIsMobileScreen();

  const {
    data: branchData,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useQuery({
    queryKey: ["branches", "detail", selectedBranch],
    queryFn: () => getSpecificBranch(selectedBranch),
  });

  const {
    data: listBranchData,
    isLoading: isLoadingListBranch,
    isError: isErrorListBranch,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
  });

  if (isErrorDetail || isErrorListBranch) return <div>Error</div>;

  if (isLoadingDetail || isLoadingListBranch) return <div>Loading...</div>;

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: 64, padding: 8 }}>
      <Flex justify="center" wrap={isMobile} gap={24}>
        <div
          style={{
            background: "white",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div style={bgStyle}>Welcome To SEA Salon</div>
          <div
            style={{
              marginTop: -32,
              marginLeft: isMobile ? 8 : 32,
            }}
          >
            <Image
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="avatar"
              width={64}
              height={64}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <Title level={4} style={{ margin: 0, padding: 0 }}>
                {branchData?.data.name}
              </Title>
              <Text style={{ margin: 0, padding: 0 }} type="secondary">
                {branchData?.data.location}
              </Text>
            </div>
          </div>
          {/* Servies */}
          <div style={{ padding: isMobile ? 8 : 32, marginTop: 16 }}>
            <Title level={5}>What We Offer</Title>

            <Text type="secondary" style={{ width: 300 }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              voluptas ex dicta veritatis fugiat labore atque accusantium.
              Eaque, assumenda ipsum.
            </Text>

            <List
              dataSource={branchData.data.services}
              renderItem={(item: any) => (
                <List.Item>
                  <Card>
                    <Meta
                      style={{ margin: 0, padding: 0 }}
                      avatar={
                        <CheckOutlined
                          style={{
                            background: "#cafecc",
                            borderRadius: "50%",
                            padding: "8px",
                            color: "#127315",
                            marginRight: "8px",
                          }}
                        />
                      }
                      title={
                        <Flex
                          justify="space-between"
                          vertical={isMobile}
                          gap={isMobile ? 8 : 0}
                        >
                          <Typography.Text strong>{item.name}</Typography.Text>
                          <Tag
                            color="blue"
                            icon={<ClockCircleOutlined />}
                            style={{ maxWidth: 150, textAlign: "center" }}
                          >
                            {item.session} minutes / session
                          </Tag>
                        </Flex>
                      }
                    />
                  </Card>{" "}
                </List.Item>
              )}
            />
          </div>
        </div>
        <div style={{ width: isMobile ? "100%" : "280px" }}>
          <Card>
            <OrderForm
              listServices={branchData.data.services}
              listBranches={listBranchData.items}
              openTime={branchData.data.open_time}
              closeTime={branchData.data.close_time}
              selectedBranch={selectedBranch}
            />
          </Card>
        </div>
      </Flex>
      <MyFooter />
    </Layout>
  );
};

export default ClientServices;
