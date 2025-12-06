"use client";
import { Input, Flex, Table, Button, Layout } from "antd";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <Layout.Content>
      <p className="my-4 font-bold text-2xl text-[#020B75]">Search startups</p>
      <Flex gap={30}>
        <Input.Search />
        <Button type="primary">Create company</Button>
      </Flex>
      <Table bordered columns={[]} dataSource={[]} style={{ marginTop: 40 }} />
    </Layout.Content>
  );
}
