"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useCounter } from "@mantine/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { CartProduct, Product } from "@/lib/interface";

type Props = {
  id: string;
};

export function ProductPage(props: Props) {
  const { id } = props;
  const [count, handlers] = useCounter(1, { min: 1, max: 30 });
  const [productSize, setSize] = useState("");
  const [productColor, setColor] = useState("");
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/getDataById?id=${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
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
    if (!product) return;

    const cartItem: CartProduct = {
      productId: product,
      productQnt: count,
      productSize,
      productColor,
    };

    await addToCart(cartItem);
    toast.success("Item added to cart!");
  };

  return (
    <div className="bg-gray-100">
      <div className="grid md:grid-cols-2 gap-6 items-start max-w-6xl mx-auto">
        {loading ? (
          <>
            <div className="w-full flex justify-center items-center">
              <Skeleton className="w-[376px] h-[500px] rounded-lg" />
            </div>

            <div className="w-full flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          </>
        ) : (
          <>
            <Swiper
              className="w-[376px] sm:max-w-screen rounded-lg bg-black/10 bg-blur"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              {product?.images.map((image) => (
                <SwiperSlide key={image}>
                  <Image
                    className="w-full h-auto object-contain"
                    src={image}
                    width={300}
                    height={400}
                    alt="Product Image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Product Details */}
            <div className="grid gap-2 m-3">
              <h1 className="text-2xl font-bold pb-3">{product?.name}</h1>
              <p className="text-gray-500 font-semibold dark:text-gray-400 text-md">
                {product?.des}
              </p>

              <div className="grid gap-2 pb-3">
                <p className="text-black font-bold text-md">
                  Marketed By Aavkar Fashion
                </p>
                <p className="text-gray-500 font-medium text-sm">
                  D2-201, Opera Palm, Pasodara Patiya, Near Kamrej, Surat - 394190
                </p>
                <p className="text-black font-bold text-md">
                  Manufacturing By Eroe Designer
                </p>
                <p className="text-gray-500 font-medium text-sm">
                  Contact us: +91 7818070999
                </p>
                <p className="text-gray-500 font-medium text-sm">
                  Email: abhaydonga007@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-2 pb-3">
                <div className="text-4xl font-bold">₹ {customerPrize}</div>
                <p className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                  -{Math.round(discount)} %
                </p>
              </div>

              <p className="text-gray-500 font-medium text-sm">
                Maximum Retail Price (Inclusive of All Taxes)
              </p>
              <div className="text-2xl font-bold text-gray-500 line-through">
                ₹ {productPrize}
              </div>

              <Select
                label="Select Size"
                className="max-w-xs"
                onChange={(e) => setSize(e.target.value)}
              >
                {product?.size?.[0]?.split(",").map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                )) || []}
              </Select>

              <Select
                label="Select Color"
                className="max-w-xs"
                onChange={(e) => setColor(e.target.value)}
              >
                {product?.color?.[0]?.split(",").map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                )) || []}
              </Select>

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

              <Button
                onClick={handleCart}
                className="w-auto rounded-full font-bold bg-amber-400"
                size="lg"
              >
                Add to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
