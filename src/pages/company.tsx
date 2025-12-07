"use client";
import { Flex, Layout, Button, Form, message, Input, Upload } from "antd";
import type { FormProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useTranslation from "@/hooks/useTranslation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";

const CkEditor = dynamic(() => import("@/components/CKEditor"), { ssr: false });

export default function Page() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [profileList, setProfile] = useState<any[]>([]);
  const [editorData, setEditorData] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [datas, setData] = useState<string>("");
  const { data: session } = useSession();

  const handleUploadChange = (info: any) => {
    if (info.fileList.length <= 1) {
      setFileList(info.fileList);
    }
  };
  const ProfileUploadChange = (info: any) => {
    if (info.fileList.length <= 1) {
      setProfile(info.fileList);
    }
  };
  const handleOnUpdate = (editor: string, field: string): void => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  const onFinish: FormProps["onFinish"] = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("meta", values.meta);
    formData.append("about", values.about);
    formData.append("profileId", Number(session?.user?.id));

    fileList.forEach((file) => {
      formData.append("background", file.originFileObj);
    });
    profileList.forEach((file) => {
      formData.append("profile", file.originFileObj);
    });

    const request = await fetch("/api/company/make", {
      method: "POST",
      body: formData,
    });

    const response = await request.json();
    console.log(response);
    // if (response > 0) {
    //   messageApi.success("Your post created");
    // } else {
    //   messageApi.success("Something has wrong");
    // }
  };
  return (
    <Layout.Content>
      {contextHolder}
      <Flex justify="center" align="middle" className="p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-3/4"
        >
          <Form.Item label={t("company_name")} name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Backgroud image" name="background">
            <Upload
              onChange={handleUploadChange}
              fileList={fileList}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Select background image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Profile image" name="profile">
            <Upload
              onChange={ProfileUploadChange}
              fileList={profileList}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Select profile image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Company meta description" name="meta">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="About" name="about">
            <CkEditor
              editorData={editorData}
              setEditorData={setEditorData}
              handleOnUpdate={handleOnUpdate}
            />
          </Form.Item>
          <Form.Item label="Web link" name="web">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Flex justify="center">
            <Button type="primary" size="large" onClick={() => form.submit()}>
              Save Blog
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Layout.Content>
  );
}
