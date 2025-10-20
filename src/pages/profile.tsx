"use client";

import { Button, Form, Input, Flex} from "antd";
import type { FormProps } from "antd";


export default function Page() {
  const [form] = Form.useForm();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log(values);
  };

  return (
    <section className="w-full h-full">
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
          <Form.Item name="about">
            <p>About</p>
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item name="jobposition">
            <p>Job Position</p>
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
