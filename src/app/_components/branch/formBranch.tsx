"use client";

import { Form, Input, Button, message, Radio, Space, TimePicker } from "antd";
import {
  MinusCircleOutlined,
  NumberOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { createNewBranch } from "@/app/_services";
import { QueryClient } from "@tanstack/react-query";

export function FormBranch() {
  const queryClient = new QueryClient();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createBranchMutation = useMutation({
    mutationFn: createNewBranch,
    onSuccess: (newBranch) => {
      queryClient.setQueryData(["branches", "detail"], newBranch.id);

      // ✅ just invalidate all the lists
      queryClient.invalidateQueries({
        queryKey: ["branches", "branches-total"],
      });

      messageApi.open({
        type: "success",
        content: "Create branch successfully",
      });

      router.push("/dashboard/branches");
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Upss, you are not authorized",
      });
    },
  });

  const handleSubmit = async (values: any) => {
    // convert date and time
    console.log("Received values of form: ", values);
    setIsLoading(true);
    try {
      createBranchMutation.mutate(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          name={"branch_name"}
          label="Branch Name"
          style={{ width: "100%" }}
        >
          <Input
            size="large"
            type="branch_name"
            placeholder="SEA Salon MKS-1"
          />
        </Form.Item>

        <Form.Item style={{ width: "100%" }} name={"location"} label="Location">
          <Input
            size="large"
            type="text"
            placeholder="Jln. Panglima Polim No.14, Makassar Sulawesi Selatan"
          />
        </Form.Item>

        <Form.Item
          label="Open Close Time"
          name="time"
          style={{ width: "100%" }}
        >
          <TimePicker.RangePicker
            style={{ width: "100%" }}
            name="time"
            showSecond={false}
            format="HH:mm"
            hourStep={1}
            minuteStep={30}
            onChange={(dates, dateString) => {
              console.log("Selected Time: ", dates);
              console.log("Formatted Selected Time: ", dateString);

              const ft = dayjs(`2000-01-01 ${dateString[0]}`);
              const tt = dayjs(`2000-01-01 ${dateString[1]}`);
              const diffHours = tt.diff(ft, "hours", true);

              if (diffHours < 5) {
                messageApi.open({
                  type: "error",
                  content: `Please select at least 5 working hours!`,
                });
              } else {
                messageApi.open({
                  type: "success",
                  content: `Good! You have selected ${diffHours} hours!`,
                });
                form.setFieldsValue({ open_time: dateString[0] });
                form.setFieldsValue({ close_time: dateString[1] });
              }
            }}
            placeholder={["Open Time", "Close Time"]}
          />
          <Form.Item
            hidden
            style={{ width: "100%" }}
            name={"open_time"}
            label="Open Time"
          ></Form.Item>
          <Form.Item
            hidden
            style={{ width: "100%" }}
            name={"close_time"}
            label="Close Time"
          ></Form.Item>
        </Form.Item>

        <Form.List
          name="services"
          rules={[
            {
              validator: async (_, adresses) => {
                if (!adresses || adresses.length < 1) {
                  return Promise.reject(
                    new Error("Must be at least 1 service"),
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "service"]}
                    rules={[
                      { required: true, message: "missing service name" },
                    ]}
                  >
                    <Input
                      placeholder="Manicure and pedicure"
                      addonBefore={<NumberOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "session_time"]}
                    rules={[
                      { required: true, message: "Misssing session time" },
                      //   {
                      //     type: "number",
                      //     min: 60,
                      //     message: "Must be at least 60 minutes",
                      //   },
                    ]}
                  >
                    <Input
                      placeholder="120"
                      type="number"
                      min={60}
                      addonAfter="minutes"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Services
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button block type="primary" htmlType="submit" loading={isLoading}>
          Create Branch
        </Button>
      </Form>
    </>
  );
}
