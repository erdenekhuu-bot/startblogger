"use client";
import { Layout, Image, Flex } from "antd";
import treeimage from "../../public/tree.png";
import { useState, useEffect } from "react";

export default function Page() {
  const [category, setCategory] = useState([]);

  const detail = async () => {
    const response = await fetch("/api/company/type");
    const data = await response.json();
    setCategory(data);
  };

  useEffect(() => {
    detail();
  }, []);

  return (
    <Layout.Content style={{ padding: 8 }}>
      <Flex justify="center">
        <Image src={treeimage.src} />
      </Flex>
      <div className="px-8 my-8">
        Стартап нь нийгэмд үзүүлэх нөлөө, өндөр түвшний технологийн хэрэглээ,
        өвөрмөц шийдэл гаргадгаараа бусад бизнесээс онцгойрохоос гадна улс орны
        эдийн засаг, нийгмийн хөгжилд том хувь нэмэр оруулдаг. Дижиталчлалын энэ
        үед улс орны хөгжлийг технологийн салбар, бий болсон юникорн (unicorn)
        компаниудын тоо, мөн стартап экосистемийн хөгжлөөр нь дүгнэж болно.
        START нь Venture Builder-ийн хувьд стартапуудын хөгжлийг хурдасгах,
        стартап бүтээх үйл ажиллагаатай ба жил бүр стартап экосистемийн хөгжилд
        хувь нэмэр оруулах үүднээс “Стартап экосистем зураглал”-ыг гаргаж олон
        нийтэд танилцуулдаг. 2022 оны зураглал нь илүү дэлгэрэнгүй гарч байгаа
        бөгөөд экосистемийн бусад тоглогчдыг хамруулан гаргаж байгаагаараа
        онцлог юм. 2022 оны зураглалд нийт 19 хэсэгт 109 стартап багтсан байна.
        Мөн экосистемийн бусад оролцогчдыг 15 хэсэгт хуваасан ба үүнд идэвхтэй
        хурдасгуур хөтөлбөр, арга хэмжээ, төрийн бус байгууллагууд,
        энтрепренерууд, хөрөнгө оруулагчид гэх мэт олон зүйлс багтаж байна.
        Зураглалд багтсан стартапуудыг бид шалгаруулахдаа нийгэмд үзүүлж буй
        нөлөө, шийдэл, бизнес модель, багийн бүтэц, ажиллах арга барил, үүсгэн
        байгуулагчдын ёс зүй, технологийн шийдэл, идэвхтэй байдал гэх мэт олон
        зүйлийг харгалзан үзэж оруулдаг. Стартап экосистемийн зураглал гаргаж
        буй зорилго нь олон нийтэд стартапуудыг таниулах, хоорондын хамтын
        ажиллагааг өргөжүүлэх, хүрээллийг нэгтгэх, гадаад болон дотоодын хөрөнгө
        оруулагчдын анхаарлыг татах байдаг. Та бүхэн энэхүү нийтлэлийн өөрийн
        хүрээлэлдээ түгээж стартапын экосистемээ дэмжээрэй. Энэхүү зураглалд
        орсон бүх стартапууд бусад байгууллагуудаа ажлын өндөр амжилт хүсье!
        Томоохон компаниудын технологийн шийдлүүдийг оруулсан байгаа ба энэ нь
        хэрэглэгчдийн асуудлыг шийдэж буй байдал, зах зээлд үзүүлж буй нөлөө,
        нөлөөллийг харгалзан үзэж орууллаа.
      </div>
      <div className="mx-4">
        <p className="font-black text-3xl text-[#020B75]">Startups</p>
        {category.map((item: any, index: number) => (
          <section>
            <div key={index} className="my-4 flex items-center gap-5">
              <div className="bg-[#2CFBFE] px-1 w-5.5 rounded-full">
                <p className="text-[#020B75] font-bold text-xl">{index + 1}</p>
              </div>
              <div>
                <p className="text-[#020B75] font-bold text-xl">
                  {item.description}
                </p>
                <Flex wrap gap={10}>
                  {item.company.map((item: any, index: number) => (
                    <Image
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/images/${item.profile}`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  ))}
                </Flex>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Layout.Content>
  );
}
