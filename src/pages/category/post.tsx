"use client";
import { Table, Layout, Input, Modal, Button, Flex, Form } from "antd";
import { useState, useEffect } from "react";
import type { FormProps } from "antd";
import { useSession } from "next-auth/react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainForm] = Form.useForm();
  const { data: session } = useSession();
  const [datasource, setData] = useState([]);

  const handleCancel = () => {
    mainForm.resetFields();
    setIsModalOpen(false);
  };

  const detail = async () => {
    const response = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  };

  const handleSumit: FormProps["onFinish"] = async (values) => {
    const request = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await request.json();
    if (response > 0) {
      handleCancel();
      detail();
    }
  };

  useEffect(() => {
    detail();
  }, [Number(session?.user.id)]);

  return (
    <Layout.Content>
      <Flex justify="end">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create category
        </Button>
      </Flex>
      <Table
        style={{ marginTop: 20 }}
        columns={[
          {
            title: "name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "description",
            dataIndex: "description",
            key: "description",
          },
        ]}
        dataSource={datasource}
        bordered
      />
      <Modal
        title=""
        open={isModalOpen}
        footer={
          <Button type="primary" onClick={() => mainForm.submit()}>
            save
          </Button>
        }
        onCancel={handleCancel}
      >
        <Form form={mainForm} onFinish={handleSumit}>
          <p>Category name</p>
          <Form.Item name="name">
            <Input />
          </Form.Item>
          <p>Description</p>
          <Form.Item name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Content>
  );
}
