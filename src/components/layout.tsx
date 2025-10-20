"use client";
import { ReactNode } from "react";
import { Layout, Menu, Button, Flex } from "antd";
import { headerStyles, contentStyle } from "@/styles/header";
import { useRouter } from "next/navigation";
import SessionProviders from "./SessionProvider";

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }: { children: ReactNode }): any {
  const router = useRouter();

  return (
    <SessionProviders>
      <Layout>
        <Header style={headerStyles}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "Home",
                onClick: () => {
                  router.push("/");
                },
              },
              {
                key: "2",
                label: "Startups",
                onClick: () => {
                  router.push("/startup");
                },
              },
              {
                key: "3",
                label: "Ecosystem",
                onClick: () => {
                  router.push("/ecosystem");
                },
              },
              {
                key: "4",
                label: "Contact",
                onClick: () => {
                  router.push("/contact");
                },
              },
            ]}
            style={{ flex: 2, minWidth: 0 }}
          />
          <Flex gap={10}>
            <Button size="large" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button size="large" onClick={() => router.push("/register")}>
              Register
            </Button>
          </Flex>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div style={contentStyle}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </SessionProviders>
  );
}
