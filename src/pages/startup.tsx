"use client";
import { Input, Flex, Table, Button, Layout, Image } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [datalist, setData] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const detail = async () => {
    const response = await fetch(
      `/api/company/readcompany?page=${pagination.current}&pageSize=${pagination.pageSize}&filter=${search}`
    );
    const data = await response.json();
    if (data.success) {
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      });
      setData(data.record);
    }
  };
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,

      pageSize: pagination.pageSize,
    });
  };
  useEffect(() => {
    detail();
  }, [pagination.current, pagination.pageSize, search]);

  return (
    <Layout.Content>
      <p className="my-4 font-bold text-2xl text-[#020B75]">Search startups</p>
      <Flex gap={30}>
        <Input.Search
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button type="primary" onClick={() => router.push("/company")}>
          Create company
        </Button>
      </Flex>
      <Table
        bordered
        columns={[
          {
            title: "Company",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: any) => {
              return (
                <Flex align="center" gap={10} wrap>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/images/${record.profile}`}
                    width={50}
                  />
                  <p>{name}</p>
                </Flex>
              );
            },
          },
          {
            title: "Company kind",
            dataIndex: "type",
            key: "type",
            render: (record: any) => record[0].description,
          },
          {
            title: "Amount asset",
            dataIndex: "currency",
            key: "currency",
            render: (record: any) => {
              return <span>{record.amount}</span>;
            },
          },
          {
            title: "Increase asset ?",
            dataIndex: "currency",
            key: "currency",
            render: (record: any) => {
              return <span>{record.amount}</span>;
            },
          },
          {
            title: "Visit",
            dataIndex: "id",
            key: "id",
            render: (id: number) => (
              <Button
                type="primary"
                onClick={() => {
                  router.push("/profilecompany/" + id);
                }}
              >
                Visit company
              </Button>
            ),
          },
        ]}
        dataSource={datalist}
        style={{ marginTop: 40 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </Layout.Content>
  );
}
