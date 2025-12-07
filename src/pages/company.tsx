"use client";
import { Flex, Layout, Button, Form, message } from "antd";
import type { FormProps } from "antd";
import useTranslation from "@/hooks/useTranslation";
import dynamic from "next/dynamic";

const CkEditor = dynamic(() => import("@/components/CKEditor"), { ssr: false });

export default function Page() {
  const [form] = Form.useForm();
  return (
    <Layout.Content>
      <Form form={form}></Form>
    </Layout.Content>
  );
}
