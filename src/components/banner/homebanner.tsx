"use client";
import { Image, Flex } from "antd";
import { useState, useEffect } from "react";
import { ThirdBanner } from "./thirdbanner";

export function HomeBanner() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
  });
  const [mainBanner, setMain] = useState<any>([]);
  const [otherBanner, setOther] = useState([]);

  const detail = async () => {
    const response = await fetch(
      `/api/post/readpost?page=${pagination.current}&pageSize=${pagination.pageSize}`
    );
    const data = await response.json();
    if (data.success) {
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      });
    }
    const checkout = data.record[0];
    setMain(checkout);
    const others = data.record.filter((item: any) => item.id !== checkout.id);
    setOther(others);
  };
  useEffect(() => {
    detail();
  }, []);

  return (
    <section>
      <Flex justify="space-between">
        <section>
          {otherBanner?.map((item: any) => (
            <div className="w-[300px] m-4">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/images/${item.metaImage}`}
                  height={200}
                />
              </div>
              {item?.category?.map((item: any) => (
                <p key={item.id} className="text-[#020B75] font-bold text-2xl">
                  {item.name}
                </p>
              ))}
              <p className="font-black text-xl">{item.title}</p>
              <p className="text-[#020B75] text-lg">
                {item?.profile?.user.username}
              </p>
            </div>
          ))}
        </section>
        <div className="w-[400px]">
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/images/${mainBanner?.metaImage}`}
            />
          </div>
          {mainBanner?.category?.map((item: any) => (
            <p key={item.id} className="text-[#020B75] font-bold text-2xl">
              {item.name}
            </p>
          ))}
          <p className="font-black text-2xl">{mainBanner?.title}</p>
          <p className="text-[#020B75] text-lg">
            {mainBanner?.profile?.user.username}
          </p>
        </div>
        <ThirdBanner />
      </Flex>
    </section>
  );
}
