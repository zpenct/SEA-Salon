import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

type TService = {
  name: string;
  session: string;
};

interface DataType {
  id: number;
  key: string;
  name: number;
  location: string;
  open_time: string;
  close_time: string;
  services: TService[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Open Time",
    key: "open_time",
    dataIndex: "open_time",
  },
  {
    title: "Close Time",
    key: "close_time",
    dataIndex: "close_time",
  },
  {
    title: "Services",
    key: "services",
    dataIndex: "services",
    render: (_, record) => (
      <Space size="middle" direction="vertical">
        {record.services.map((service) => (
          <Space key={service.name}>
            <p style={{ fontWeight: "bold", margin: 0, padding: 0 }}>
              {service.name}
            </p>
            <Tag style={{ color: "#6155A6", margin: 0 }} color="#E7E7FF">
              {" "}
              <ClockCircleOutlined /> {service.session} minutes
            </Tag>
          </Space>
        ))}
      </Space>
    ),
  },
];

interface Props {
  loading?: boolean;
  data?: any;
}

const BranchesTable: React.FC<Props> = ({ loading, data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.id}
    />
  );
};

export default BranchesTable;
