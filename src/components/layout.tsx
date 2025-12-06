"use client";
import { ReactNode } from "react";
import { Layout, Menu } from "antd";
import { headerStyles, contentStyle } from "@/styles/header";
import { useRouter } from "next/navigation";
import SessionProviders from "./SessionProvider";
import { SignUser } from "@/components/loginwindow/signuser";
import useTranslation from "@/hooks/useTranslation";

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
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
                label: t("home"),
                onClick: () => {
                  router.push("/");
                },
              },
              {
                key: "2",
                label: t("startup"),
                onClick: () => {
                  router.push("/startup");
                },
              },
              {
                key: "3",
                label: t("ecosystem"),
                onClick: () => {
                  router.push("/ecosystem");
                },
              },
              {
                key: "4",
                label: t("contact"),
                onClick: () => {
                  router.push("/contact");
                },
              },
            ]}
            style={{ flex: 2, minWidth: 0 }}
          />
          <SignUser />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div style={contentStyle}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} {t("footer")}
        </Footer>
      </Layout>
    </SessionProviders>
  );
}
