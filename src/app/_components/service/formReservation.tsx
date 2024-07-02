"use client";

import React from "react";
import { PhoneFilled, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  DatePicker,
  message,
  Divider,
  TimePicker,
} from "antd";
import type { DatePickerProps, GetProps } from "antd";
import dayjs from "dayjs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { createNewReservation } from "@/app/_services";
import { useSession } from "next-auth/react";

interface Props {
  //TODO: Make Type
  listServices: any[];
  listBranches: any[];
}

const OrderForm: React.FC<Props> = ({ listServices, listBranches }) => {
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const { data, status } = useSession();

  const [isLoading, setIsLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [form] = Form.useForm();

  const params = new URLSearchParams(searchParams.toString());

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", {
      ...values,
      full_name: data?.user.full_name,
      phone_number: data?.user.phone_number,
    });
    setIsLoading(true);
    try {
      const res = await createNewReservation(values);
      if (res.status === "success") {
        messageApi.open({
          type: "success",
          content: "Your reservation has been created successfully",
        });

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error.message);
      messageApi.open({
        duration: 6,
        type: "error",
        content: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (value: string) => {
    form.setFieldValue("type", value);
  };

  const handleBranchChange = (value: string) => {
    params.set("branch", value);
    router.push(`${pathname}?${params.toString()}`);
    form.setFieldValue("branch", value);
  };

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
    form.setFieldsValue({ order_time: dayjs(value).format() });
  };

  const disabledRangeTime: RangePickerProps["disabledTime"] = (_x, type) => {
    if (type === "start") {
      return {
        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24],
      };
    }
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24],
    };
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="type"
          rules={[
            { required: true, message: "Please Select your order service!" },
          ]}
        >
          <Typography.Title level={5}>Type of service</Typography.Title>
          <Select
            defaultValue={listServices[0].name}
            style={{ width: 200 }}
            onChange={handleTypeChange}
            options={listServices.map((item: any) => ({
              value: item.name,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="branch"
          rules={[
            { required: true, message: "Please Select your order service!" },
          ]}
        >
          <Typography.Title level={5}>Order Branch</Typography.Title>
          <Select
            defaultValue={listBranches[0].name}
            style={{ width: 200 }}
            onChange={handleBranchChange}
            options={listBranches.map((item: any) => ({
              value: item.name,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="order_date"
          rules={[
            { required: true, message: "Please Select your order date!" },
          ]}
        >
          <Typography.Title level={5}>Order Date</Typography.Title>
          <DatePicker
            name="order_date"
            onChange={(value, dateString) => {
              form.setFieldsValue({ order_date: dayjs(value).format() });
            }}
            minDate={dayjs(dayjs().format(), "YYYY-MM-DD")}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item
          name="order_time"
          rules={[
            { required: true, message: "Please Select your order time!" },
          ]}
        >
          <Typography.Title level={5}>Order At</Typography.Title>
          <TimePicker.RangePicker
            disabledTime={disabledRangeTime}
            name="order_time"
            showSecond={false}
            format="HH:mm"
            hourStep={1}
            minuteStep={30}
            onChange={(dates, dateString) => {
              const ft = dayjs(`2000-01-01 ${dateString[0]}`);
              const tt = dayjs(`2000-01-01 ${dateString[1]}`);
              const diffHours = tt.diff(ft, "hours", true);

              if (diffHours < 1) {
                messageApi.open({
                  type: "error",
                  content: `Please select at least 1 hour!`,
                });
              } else {
                messageApi.open({
                  type: "success",
                  content: `Good! You have selected ${diffHours} hours!`,
                });
                form.setFieldsValue({ order_time: dateString });
                form.setFieldsValue({ start_time: dateString[0] });
                form.setFieldsValue({ end_time: dateString[1] });
              }
            }}
            placeholder={["Start Time", "End Time"]}
          />
        </Form.Item>
        <Form.Item name="start_time" hidden />
        <Form.Item name="end_time" hidden />
        <Divider />
        <Typography.Title level={5}>Order By</Typography.Title>
        <Form.Item name="full_name">
          <Input
            name="full_name"
            addonBefore={<UserOutlined />}
            value={data?.user.full_name}
            defaultValue={data?.user.full_name}
            disabled
          />
        </Form.Item>
        <Form.Item name="phone_number">
          <Input
            value={data?.user.phone_number}
            name="phone_number"
            addonBefore={<PhoneFilled />}
            defaultValue={data?.user.phone_number}
            disabled
          />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Book Now!
        </Button>
      </Form>
    </>
  );
};

export default OrderForm;
