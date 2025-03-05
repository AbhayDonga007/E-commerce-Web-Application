import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { Pacifico } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});
const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
});

type Props = {
  type: string;
};

interface Product {
  _id: string;
  name: string;
  des: string;
  type: Array<string>;
  size: Array<string>;
  customerPrize: number;
  productPrize: number;
  retailPrize: number;
  artical_no: string;
  color: Array<string>;
  images: Array<string>;
}

const CategoryProducts = (props: Props) => {
  const name = props.type;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/getDataByType?type=${name}`);
      console.log(setData(res.data));
    };

    getData();
  }, [name]);
  return (
    <section className="w-full flex justify-center py-6">
      <div className="container grid gap-8 md:gap-12 px-4 md:px-6">
        <div className="text-center md:items-center gap-4 md:gap-8">
          <div className="grid gap-3">
            <div className={pacifico.className}>
              <h1 className="text-4xl font-bold">Best Collection of {name}</h1>
            </div>
            <div className={libre.className}>
              <p className="text-gray-500">Timeless Elegance, Everyday Style</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:pl-20 xl:pr-20 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-4">
          {data.map((item: Product, index) => {
            const productPrize = item.productPrize ?? 0;
            const customerPrize = item.customerPrize ?? 0;

            const discount =
              productPrize !== 0
                ? ((productPrize - customerPrize) / productPrize) * 100
                : 0;
            return (
              // <BackgroundGradient
              //   key={index}
              //   className="rounded-[22px] max-w-sm bg-white"
              // >
                <div key={index} className="grid">
                  <div className="grid relative group">
                    <Card
                      isFooterBlurred
                      // xl:min-h-[390px] min-h-[270px] max-h-[500px]
                      className="rounded-[22px]  bg-gray-200"
                      shadow="sm"
                      key={index}
                      isPressable
                      onPress={() => console.log("item pressed")}
                    >
                      <CardHeader className="p-2 absolute z-10 flex-col items-start">
                        <Button
                          isIconOnly
                          className="bg-red-600 text-white font-bold px-2 py-1 rounded-full text-sm"
                        >
                          <Link
                            className="absolute inset-0 z-10"
                            href={`/product/${item._id}`}
                          ></Link>
                          -{Math.round(discount)}%
                        </Button>
                      </CardHeader>
                      <CardHeader className="p-2 absolute z-10 flex-col items-end">
                        <Button
                          isIconOnly
                          className="rounded-full bg-zinc-300 "
                        >
                          <ShoppingCart />
                          <Link
                            className="absolute inset-0 z-10"
                            href={`/product/${item._id}`}
                          ></Link>
                        </Button>
                      </CardHeader>
                      <CardBody className="p-0">
                        <Swiper
                          className="w-full bg-black/30 bg-blur"
                          modules={[Navigation, Pagination, Scrollbar, A11y]}
                          // spaceBetween={50}
                          slidesPerView={1}
                          // navigation
                          pagination={{
                            clickable: true,
                            dynamicBullets: true,
                          }}
                          // scrollbar={{ draggable: true }}
                          // onSwiper={(swiper) => console.log(swiper)}
                          // onSlideChange={() => console.log('slide change')}
                        >
                          {item.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                alt="Leather Jacket"
                                className="object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity gap-y-3"
                                height={350}
                                src={image}
                                width={400}
                              />
                              <Link
                                className="absolute inset-0 z-10"
                                href={`/product/${item._id}`}
                              ></Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </CardBody>
                      <CardFooter className="flex flex-col relative bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
                        <div>
                          <p className="text-black w-auto text-[14px] line-clamp-1 text-start xl:text-center font-semibold">
                            {item.name}
                          </p>
                        </div>
                        <div>
                          <p className="w-auto text-[12px] text-gray-500 text-center font-semibold">
                            {item.type}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="text-red-700 w-auto text-[14px] truncate text-start max-h-[22px] font-semibold">
                            ₹ {item.customerPrize}
                          </p>
                          <p className="text-red-700 w-auto text-[14px] truncate text-start max-h-[22px] font-semibold line-through">
                            ₹ {item.productPrize}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              // </BackgroundGradient>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
