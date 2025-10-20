"use client"

// @ts-ignore
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

export default function SessionProviders({children}: {children: ReactNode}) {
    return <SessionProvider>{children}</SessionProvider>
}