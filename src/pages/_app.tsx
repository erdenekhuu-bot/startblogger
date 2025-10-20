import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/components/layout";
import SessionProviders from "@/components/SessionProvider";

export default function App({ Component, pageProps }: AppProps) {
  return <MainLayout>
      <SessionProviders session={null}>
          <Component {...pageProps} />
      </SessionProviders>
  </MainLayout>
}
