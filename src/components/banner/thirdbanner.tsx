"use client";
import { useState, useEffect } from "react";
import { Flex, Image } from "antd";
import itembanner from "../../../public/itembanner.svg";

export function ThirdBanner() {
  const [otherBanner, setOther] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
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
      setOther(data.record);
    }
  };
  useEffect(() => {
    detail();
  }, []);
  return (
    <div>
      <p className="text-3xl font-black text-[#020B75] my-4">Их уншсан</p>
      {otherBanner?.map((item: any, index: number) => (
        <Flex style={{ marginTop: 10 }}>
          <Image src={itembanner.src} />
          <p key={index} className="font-bold text-[#020B75] text-2xl">
            {index + 1}
          </p>
          <div className="w-96 mx-4">
            {item?.category?.map((item: any) => (
              <p key={item.id} className="text-[#020B75] font-bold text-2xl">
                {item.name}
              </p>
            ))}
            <p className="text-xl font-bold">{item.title}</p>
          </div>
        </Flex>
      ))}
    </div>
  );
}
