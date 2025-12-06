"use client";

import { Flex, Input, Form, message, Button, Upload } from "antd";
import type { FormProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const CkEditor = dynamic(() => import("@/components/CKEditor"), { ssr: false });

export default function Page() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: session } = useSession();
  console.log(session);
  const [editorData, setEditorData] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("meta", values.meta);
    formData.append("content", editorData);

    fileList.forEach((file) => {
      formData.append("metaImage", file.originFileObj);
    });

    const request = await fetch("/api/post/make", {
      method: "POST",
      body: formData,
    });

    const response = await request.json();
    console.log(response);
  };
  const handleUploadChange = (info: any) => {
    if (info.fileList.length <= 1) {
      setFileList(info.fileList);
    }
  };

  return (
    <Flex justify="center" align="middle" className="p-6">
      {contextHolder}
      <Form className="w-3/4" form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Blog title">
          <Input size="large" placeholder="Enter title" />
        </Form.Item>

        <Form.Item name="meta" label="Blog meta">
          <Input.TextArea rows={4} placeholder="Meta description" />
        </Form.Item>

        <Form.Item name="metaImage" label="Upload Images">
          <Upload
            onChange={handleUploadChange}
            fileList={fileList}
            beforeUpload={() => false}
            multiple
          >
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="content" label="Blog content">
          <CkEditor
            editorData={editorData}
            setEditorData={setEditorData}
            handleOnUpdate={handleOnUpdate}
          />
        </Form.Item>

        <Flex justify="center">
          <Button type="primary" size="large" onClick={() => form.submit()}>
            Save Blog
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
}
