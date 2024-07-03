import React from "react";
import { Space, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";
import { formatDate, showNotificationDate } from "@/app/utils";
import { TReservation } from "../../../../types";

const columns: TableProps<TReservation>["columns"] = [
  {
    title: "Name",
    key: "name",
    render: (_, record) => <p>{record.reservated_by.full_name}</p>,
  },
  {
    title: "Order At",
    key: "name",
    render: (_, record) => (
      <Space size="middle" direction="vertical">
        <Typography.Text strong>{record.reservated_in.name}</Typography.Text>
        <Typography.Text type="secondary">
          {record.reservated_in.location}
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: "Service",
    key: "service",
    dataIndex: "service",
  },
  {
    title: "Order For",
    key: "order_date",
    dataIndex: "order_date",
    render: (text) => <p>{formatDate(text)}</p>,
    sorter: true,
  },
  {
    title: "Order Date",
    key: "created_at",
    dataIndex: "created_at",
    render: (text) => <p>{showNotificationDate(text)}</p>,
    sorter: true,
  },
  {
    title: "Start Session",
    dataIndex: "start_time",
    key: "start_time",
  },
  {
    title: "End Session",
    dataIndex: "end_time",
    key: "end_time",
  },
];

interface Props {
  loading?: boolean;
  onChange?: () => void;
  onSearch?: () => void;
  data?: any;
}

const ReservationsTable: React.FC<Props> = ({ loading, data }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default ReservationsTable;
