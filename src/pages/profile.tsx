"use client"

import { Button, Form, Input, Flex,Upload,message } from 'antd';
import type { FormProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default function Page(){
    const [form] = Form.useForm();

    const onFinish: FormProps["onFinish"] = async (values) => {
        console.log(values);
    }

    return <section className="w-full h-full">
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

                <Form.Item name="profile">
                    <p>Profile Image</p>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="jobposition">
                    <p>Job Position</p>
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button onClick={()=>form.submit()} type="primary">Log in</Button>
                </Form.Item>

            </Form>
        </Flex>
    </section>
}