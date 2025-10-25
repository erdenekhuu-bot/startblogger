"use client";

import { Flex, Input, Form, message, Button } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import dynamic from "next/dynamic";
const CkEditor = dynamic(() => import("@/components/CkEditor"), { ssr: false });

export default function Page() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  
  const [editorData, setEditorData] = useState<string>("");
  const [data, setData] = useState<string>("");
  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };
  const onFinish: FormProps["onFinish"] = async (values) => {
    const merge = { ...values, content: data };
    console.log(merge);
  
  };

  return (
    <Flex justify="center" align="middle" className="p-6">
      {contextHolder}
      <Form className="w-2/4" form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Blog title">
          <Input size="large" placeholder="Enter title" />
        </Form.Item>

        <Form.Item name="meta" label="Blog meta">
          <Input.TextArea rows={4} placeholder="Meta description" />
        </Form.Item>

        <Form.Item name="content" label="Blog content">
          <CkEditor
            editorData={editorData}
            setEditorData={setEditorData}
            handleOnUpdate={handleOnUpdate}
          />
        </Form.Item>

        <Flex justify="center">
          <Button type="primary" size="large" onClick={()=>form.submit()}>
            Save Blog
          </Button>
        </Flex>
      </Form>

      
    </Flex>
  );
}
