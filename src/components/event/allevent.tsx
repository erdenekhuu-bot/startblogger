"use client";
import { useState, useEffect } from "react";
import { Flex, Image } from "antd";

export function AllEvent() {
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const detail = async () => {
    const response = await fetch(
      `/api/post/readpost?page=${pagination.current}&pageSize=${pagination.pageSize}&filter=3`
    );
    const data = await response.json();
    if (data.success) {
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      });
      setData(data.record);
    }
  };
  useEffect(() => {
    detail();
  }, []);

  return (
    <Flex gap={10}>
      {data.map((item: any) => (
        <div className="w-[200px]">
          <div className="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/images/${item?.metaImage}`}
              height={350}
              className="object-cover"
            />
            <p className="bg-[#2AE5B1] font-bold text-xl">{item?.title}</p>
          </div>
        </div>
      ))}
    </Flex>
  );
}
