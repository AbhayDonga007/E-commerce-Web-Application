"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { ShoppingCart } from "lucide-react";
import { Pacifico, Libre_Baskerville } from "next/font/google";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";
import { Product } from "@/lib/interface";

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

export function CardProduct() {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getData");
        console.log("Fetched Data:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    getData();
  }, []);

  return (
    <section className="w-full flex justify-center py-6">
      <div className="container grid gap-8 md:gap-12 px-4 md:px-6">
        <div className="text-center md:items-center gap-4 md:gap-8">
          <div className="grid gap-3">
            <div className={pacifico.className}>
              <h1 className="text-4xl font-bold">Shop By Collection</h1>
            </div>
            <div className={libre.className}>
              <p className="text-gray-500">Fulfill the Fashion Forever</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:pl-20 xl:pr-20 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-6">
          {data === null
            ? Array.from({ length: 8 }).map((_, index) => (
                <Card
                  key={index}
                  className="w-full rounded-[22px] space-y-5 p-4"
                >
                  <Skeleton className="rounded-[22px] h-[250px]">
                    <div className="h-24 rounded-lg bg-default-300" />
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                  </div>
                </Card>
              ))
            : data.map((item: Product, index) => {
                const productPrize = item.productPrize ?? 0;
                const customerPrize = item.customerPrize ?? 0;
                const discount =
                  productPrize !== 0
                    ? ((productPrize - customerPrize) / productPrize) * 100
                    : 0;

                return (
                  <div key={item._id} className="grid">
                    <div className="grid relative group">
                        <Card
                          isFooterBlurred
                          className="rounded-[22px] bg-gray-200"
                          shadow="sm"
                          isPressable
                          onPress={() => console.log("Item pressed")}
                          >
                          <Link href={`/product/${item._id}`}>
                          {/* Discount Label */}
                          <CardHeader className="p-2 absolute z-10 flex-col items-start">
                            <Button
                              isIconOnly
                              className="bg-red-600 text-white font-bold px-2 py-1 rounded-full text-sm"
                            >
                              {/* <Link
                                className="absolute inset-0 z-10"
                                href={`/product/${item._id}`}
                              ></Link> */}
                              -{Math.round(discount)}%
                            </Button>
                          </CardHeader>

                          {/* Cart Button */}
                          <CardHeader className="p-2 absolute z-10 flex-col items-end">
                            <Button
                              isIconOnly
                              className="rounded-full bg-zinc-300"
                            >
                              <ShoppingCart />
                              {/* <Link
                                className="absolute inset-0 z-10"
                                href={`/product/${item._id}`}
                              ></Link> */}
                            </Button>
                          </CardHeader>

                          {/* Product Image Slider */}
                          <CardBody className="p-0">
                            <Swiper
                              className="w-full bg-black/30 bg-blur"
                              modules={[
                                Navigation,
                                Pagination,
                                Scrollbar,
                                A11y,
                              ]}
                              slidesPerView={1}
                              pagination={{
                                clickable: true,
                                dynamicBullets: true,
                              }}
                            >
                              {item.images.map((image, imgIndex) => (
                                <SwiperSlide key={imgIndex}>
                                  <Image
                                    alt="Product Image"
                                    className="object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity gap-y-3"
                                    height={350}
                                    src={image}
                                    width={400}
                                  />
                                  {/* <Link
                                    className="absolute inset-0 z-10"
                                    href={`/product/${item._id}`}
                                  ></Link> */}
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </CardBody>

                          {/* Product Details */}
                          <CardFooter className="flex flex-col relative bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
                            <div>
                              <p className="text-black w-auto text-[14px] line-clamp-1 text-start xl:text-center font-semibold">
                                {item.name}
                              </p>
                            </div>
                            <div>
                              <p className="w-auto text-[12px] text-gray-500 text-center font-semibold">
                                {item.type.join(", ")}
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
                      </Link>
                        </Card>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
