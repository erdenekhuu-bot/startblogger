"use client";

import { Button, Flex } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import LanguageSwitcher from "../LanguageSwitcher";

export function SignUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Flex gap={10} align="center">
      {status === "authenticated" ? (
        <Button size="large" onClick={() => signOut({ callbackUrl: "/" })}>
          {t("signOut")}
        </Button>
      ) : (
        <Flex gap={10}>
          <Button size="large" onClick={() => router.push("/signin")}>
            {t("signIn")}
          </Button>
          <Button size="large" onClick={() => router.push("/register")}>
            {t("signUp")}
          </Button>
        </Flex>
      )}
      <LanguageSwitcher />
    </Flex>
  );
}
