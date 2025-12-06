"use client";

import { Button, Form, Input, Flex, message } from "antd";
import type { FormProps } from "antd";
import { useRouter } from "next/navigation";
import { ZUSTAND } from "@/zustand";

export default function Page() {
  const { userId } = ZUSTAND();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish: FormProps["onFinish"] = async (values) => {
    const merge = {
      ...values,
      userId,
    };
    const response = await fetch("/api/profile/register", {
      method: "post",
      body: JSON.stringify(merge),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.success) {
      message.success("Profile successfully registered");
      router.push("/");
    } else {
      message.error(data.msg);
    }
  };

  return (
    <section className="w-full h-full">
      {contextHolder}
      <Flex align={"center"} justify={"center"}>
        <Form form={form} onFinish={onFinish}>
          <Flex gap={20}>
            <div>
              <p>Firstname</p>
              <Form.Item name="firstname">
                <Input />
              </Form.Item>
            </div>
            <div>
              <p>Lastname</p>
              <Form.Item name="lastname">
                <Input />
              </Form.Item>
            </div>
          </Flex>
          <p>About</p>
          <Form.Item name="about">
            <Input.TextArea rows={5} />
          </Form.Item>
          <p>Job Position</p>
          <Form.Item name="jobposition">
            <Input />
          </Form.Item>
          <section>
            <p className="my-2">Contact:</p>
            <div>
              <p>Instagram links</p>
              <Form.Item name="instagram">
                <Input />
              </Form.Item>
            </div>
            <div>
              <p>Facebook links</p>
              <Form.Item name="facebook">
                <Input />
              </Form.Item>
            </div>
            <div>
              <p>Linkeding links</p>
              <Form.Item name="linkeding">
                <Input />
              </Form.Item>
            </div>
            <div>
              <p>Twitter links</p>
              <Form.Item name="twitter">
                <Input />
              </Form.Item>
            </div>
          </section>

          <Button onClick={() => form.submit()} type="primary">
            Save
          </Button>
        </Form>
      </Flex>
    </section>
  );
}
