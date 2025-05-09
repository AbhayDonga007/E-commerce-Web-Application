"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

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

const products = [
  {
    id: 1,
    name: "T-shirt for Men",
    price: 90.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Travel Bag Jeans",
    price: 79.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Jean's Shorts",
    price: 70.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Sofa for Interior",
    price: 375.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 375.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Travel Bag Jeans",
    price: 375.0,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/getData");
      console.log(setData(res.data));
    };

    getData();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Last added</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:pl-20 xl:pr-20 lg:grid-cols-3 xl:grid-cols-3 gap-2 xl:gap-3">
        {data.map((item: Product, index) => {
          const productPrize = item.productPrize ?? 0;
          const customerPrize = item.customerPrize ?? 0;

          const discount =
            productPrize !== 0
              ? ((productPrize - customerPrize) / productPrize) * 100
              : 0;
          return (
            <div key={index} className="grid">
              <div className="grid relative group">
                <Card
                  isFooterBlurred
                  className="rounded-[22px] bg-gray-200"
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
                      -{Math.round(discount)}%
                    </Button>
                  </CardHeader>
                  <CardHeader className="p-2 absolute z-10 flex-col items-end">
                    <Button isIconOnly className="rounded-full bg-zinc-300 ">
                      <ShoppingCart />
                    </Button>
                  </CardHeader>
                  <CardBody className="p-0">
                    <Swiper
                      className="w-full bg-black/30 bg-blur"
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      slidesPerView={1}
                      pagination={{
                        clickable: true,
                        dynamicBullets: true,
                      }}
                    >
                      <SwiperSlide key={index}>
                        <Image
                          alt="Leather Jacket"
                          className="object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity gap-y-3"
                          height={350}
                          src={item.images[0]}
                          width={400}
                        />
                      </SwiperSlide>
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
                    <div className="flex w-full justify-center gap-2">
                      <Button variant="ghost" size="md">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="md"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
