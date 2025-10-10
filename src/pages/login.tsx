"use client"

import { Button, Form, Input, Flex } from 'antd';
import type { FormProps } from "antd";

export default function Page(){
    const [form] = Form.useForm();

    const onFinish: FormProps["onFinish"] = async (values) => {
        console.log(values);
    }

    return <section className="w-full h-full">
        <Flex align={"center"} justify={"center"}>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="username" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input type="password" />
                </Form.Item>
                <Form.Item>
                    <Button onClick={()=>form.submit()} type="primary">Log in</Button>
                </Form.Item>
            </Form>
        </Flex>
    </section>
}