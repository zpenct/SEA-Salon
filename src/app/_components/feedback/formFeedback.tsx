"use client";

import React from "react";
import { FrownFilled, MehFilled, SmileFilled } from "@ant-design/icons";
import { Flex, Input, Rate, Typography, message, Button, Form } from "antd";
import { createNewReview } from "@/app/_services";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { reviewsKey } from "@/app/_constant/queryKey";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownFilled style={{ color: "#ff0000" }} />,
  2: <FrownFilled style={{ color: "#ffa700" }} />,
  3: <MehFilled style={{ color: "#f0cf00" }} />,
  4: <SmileFilled style={{ color: "#a3ff00" }} />,
  5: <SmileFilled style={{ color: "#2cba00" }} />,
};

const FormFeedback: React.FC = () => {
  const queryClient = new QueryClient();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = React.useState(false);

  const createFeedBackMutation = useMutation({
    mutationFn: createNewReview,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [reviewsKey.LIST] }),
        queryClient.invalidateQueries({ queryKey: [reviewsKey.TOTAL] }),
      ]);
      messageApi.open({
        type: "success",
        content: "Thank you for your feedback!",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Something went wrong. Please try again.",
      });
    },
  });

  const onFinish = (values: any) => {
    setIsLoading(true);
    try {
      createFeedBackMutation.mutate(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      form.resetFields();
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} name="feedback" onFinish={onFinish}>
        <Form.Item
          name="full_name"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Please enter your name" size="large" />
        </Form.Item>
        <Form.Item
          name="notes"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please enter your feedback!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Please enter your feedback"
            size="large"
          />
        </Form.Item>
        <Typography.Title level={5} style={{ marginTop: "20px" }}>
          Express your experience
        </Typography.Title>
        <Form.Item name={"rating"} rules={[{ required: true }]}>
          <Flex justify="center">
            <Rate
              tooltips={["Terrible", "Bad", "Good", "Very good", "Excellent"]}
              onChange={(value) => form.setFieldValue("rating", value)}
              defaultValue={3}
              character={({ index = 0 }) => customIcons[index + 1]}
              style={{ fontSize: "32px", display: "block" }}
            />
          </Flex>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isLoading}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default FormFeedback;
