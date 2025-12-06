"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Flex, Layout } from "antd";
import Image from "next/image";
import banner from "../../public/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { HomeBanner } from "@/components/banner/homebanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Layout className={`${geistSans} ${geistMono}`}>
      <Flex justify={"center"} align={"center"}>
        <Image src={banner} alt="" />
      </Flex>
      <Layout.Content style={{ marginTop: 30 }}>
        <HomeBanner />
      </Layout.Content>
    </Layout>
  );
}
