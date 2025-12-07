"use client";

import { Layout } from "antd";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { company } = router.query;
  return <Layout.Content>{company}</Layout.Content>;
}
