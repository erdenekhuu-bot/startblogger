import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}
