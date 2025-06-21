"use client";

import { Layout, Menu } from "antd";
import { headerStyle } from "@/styles/header";
const { Header } = Layout;

export function Nav() {
  const items = Array.from({ length: 3 }).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));
  return (
    <Header style={headerStyle}>
      <div className="demo-logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
