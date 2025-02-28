"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useCounter } from "@mantine/hooks";
import { useSession } from "@clerk/nextjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import Nav from "./Nav";
import { useRouter } from "next/navigation";
import { Footer } from "./Footer";

type Props = {
  id: string;
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

export function ProductPage(props: Props) {
  const { id } = props;
  const [count, handlers] = useCounter(1, { min: 1, max: 30 });
  const [productSize, setSize] = useState("");
  const [productColor, setColor] = useState("");
  const session = useSession();
  const userId = session.session?.user.id;

  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/getDataById?id=${id}`);
      setProduct(res.data);
    };

    getData();
  }, [id]);

  const productPrize = product?.productPrize ?? 0;
  const customerPrize = product?.customerPrize ?? 0;

  const discount =
    productPrize !== 0
      ? ((productPrize - customerPrize) / productPrize) * 100
      : 0;

  const handleCart = async () => {
    console.log("userID", userId);

    const cartItem = {
      productId: id,
      productQnt: count,
      productSize,
      productColor,
    };

    if (!userId) {
      // If user is not logged in, store data in localStorage
      const localCart = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      ) as Array<any>;
      localCart.push(cartItem);
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      toast.success("Item added to cart (Guest Mode)");

      return;
    }

    // If user is logged in, proceed with API call
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...cartItem }),
      });

      if (response.status === 201) {
        toast.success("Item Added to your cart");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="grid md:grid-cols-2 items-start max-w-6xl mx-auto">
        <Swiper
          className="w-[376px] sm:max-w-screen rounded-lg bg-black/10 bg-blur"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {product?.images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                className="w-full h-auto object-contain"
                src={image}
                width={300}
                height={400}
                alt="Picture of the author"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="grid gap-2 m-3">
          <div>
            <h1 className="text-2xl font-bold pb-3">{product?.name}</h1>
            <p className="text-gray-500 font-semibold dark:text-gray-400 text-md">
              {product?.des}
            </p>
          </div>
          <div className="grid gap-2 pb-3">
            <p className="text-black font-bold text-md">
              Marketed By Aavkar Fashion and Retail
            </p>
            <p className="text-gray-500 font-medium text-sm">
              G 31,32 Vinayak Aracad Opp Shrinidhi Res. Sudama Chowk Surat
              394101
            </p>
            <p className="text-black font-bold text-md">
              Manufacturing By Eroe Designer
            </p>
            <p className="text-gray-500 font-medium text-sm">
              Contact us: +91 99982 64004
            </p>
            <p className="text-gray-500 font-medium text-sm">
              Email: aavkarfashion71@gmail.com
            </p>
          </div>
          <div className="grid">
            <div className="flex items-center gap-2 pb-3">
              <div className="text-4xl font-bold">
                ₹ {product?.customerPrize}
              </div>
              <p className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                -{Math.round(discount)} %
              </p>
            </div>
            <div>
              <p className="text-gray-500 font-medium  text-sm">
                Maximun Retail Prize (Inclusive of All Taxes)
              </p>
              <div className="text-2xl font-bold text-gray-500 line-through">
                ₹ {product?.productPrize}
              </div>
            </div>
            <div className="grid gap-2 pt-3">
              <div className="w-full flex flex-col gap-4">
                <div
                  key="md"
                  className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                >
                  <Select
                    label="Select Size"
                    className="max-w-xs"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {product?.size[0]?.split(",").map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    )) || []}
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="w-full flex flex-col gap-4">
                <div
                  key="md"
                  className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                >
                  <Select
                    label="Select Color"
                    className="max-w-xs"
                    onChange={(e) => setColor(e.target.value)}
                  >
                    {product?.color[0]?.split(",").map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    )) || []}
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid gap-2 pb-3">
              <p className="text-gray-500 font-medium text-sm">Quantity</p>
              <div className="flex items-center gap-2">
                <ButtonGroup className="" size="lg">
                  <Button
                    onClick={handlers.increment}
                    className="font-bold bg-amber-300"
                    size="lg"
                    isIconOnly
                    radius="full"
                  >
                    <PlusIcon />
                  </Button>
                  <div className="w-10 text-[32px] text-black text-center font-semibold bg-amber-300">
                    {" "}
                    {Number(count)}
                  </div>
                  <Button
                    onClick={handlers.decrement}
                    className="font-bold bg-amber-300"
                    size="lg"
                    isIconOnly
                    radius="full"
                  >
                    <MinusIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <Button
              onClick={handleCart}
              className="w-auto rounded-full font-bold bg-amber-400"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
