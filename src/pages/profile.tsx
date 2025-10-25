"use client";

import { Button, Form, Input, Flex, message } from "antd";
import type { FormProps } from "antd";
import { useRouter } from "next/navigation";

export default function Page() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish: FormProps["onFinish"] = async (values) => {
    const merge = {
      ...values,
      userId: 1,
    };
    const response = await fetch("/api/profile/register", {
      method: "post",
      body: JSON.stringify(merge),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
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

          <Form.Item>
            <Button onClick={() => form.submit()} type="primary">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </section>
  );
}
