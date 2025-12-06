"use client";

import { Button, Flex } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignUser() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Flex gap={10}>
      {status === "authenticated" ? (
        <Button size="large" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Button>
      ) : (
        <div>
          <Button size="large" onClick={() => router.push("/signin")}>
            Sign in
          </Button>
          <Button size="large" onClick={() => router.push("/register")}>
            Register
          </Button>
        </div>
      )}
    </Flex>
  );
}
