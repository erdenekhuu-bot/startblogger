"use client";
import { Geist, Geist_Mono } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import useTranslation from "@/hooks/useTranslation";
import { Flex } from "antd";
import Image from "next/image";
import banner from "../../public/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSession } from "next-auth/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <section className={`${geistSans} ${geistMono}`}>
      <Flex justify={"center"} align={"center"}>
        <Image src={banner} alt="" />
      </Flex>
      <Flex justify={"space-evenly"} gap={20} wrap></Flex>
    </section>
  );
}
