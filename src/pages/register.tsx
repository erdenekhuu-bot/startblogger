"use client";

import { Button, Form, Input, Flex } from "antd";
import type { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { ZUSTAND } from "@/zustand";

export default function Page() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { gotoPage } = ZUSTAND();

  const onFinish: FormProps["onFinish"] = async (values) => {
    const request = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await request.json();
    if (response > 0) {
      router.push("/profile");
    }
    console.log(response, "already exist");
  };

  return (
    <section className="w-full h-full">
      <Flex align={"center"} justify={"center"}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => form.submit()} type="primary">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </section>
  );
}
