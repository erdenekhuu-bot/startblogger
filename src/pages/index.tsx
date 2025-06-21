import { Geist, Geist_Mono } from "next/font/google";
import { useTranslations } from "next-intl";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getStaticProps(context: { locale: any }) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className={`${geistSans.className} ${geistMono.className} bg-white`}>
      {t("title")}
    </div>
  );
}
