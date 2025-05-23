"use client";
import Banner from "@/components/Banner";
import { CardProduct } from "@/components/Card";
import { Category } from "@/components/Category";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import CategoryProducts from "@/components/CategoryProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import "primeicons/primeicons.css";
import CustomerExp from "@/components/CustomerExp";
import QualityProduct from "@/components/QualityProduct";

import img1 from "@/images/banner1.png";
import img2 from "@/images/banner2.png";
import img3 from "@/images/banner3.png";
import img4 from "@/images/banner4.png";
import img5 from "@/images/banner5.png";
import Nav from "@/components/Nav";
import ShowRoom from "@/components/ShowRoom";
import { Reels } from "@/components/Reels";
import { useSession } from "@clerk/nextjs";

type Props = {};

const DashBoard = (props: Props) => {
  const session = useSession();
    const userId = session.session?.user.id;
      if(userId){
        localStorage.clear();
      }
  return (
    <>
      <Banner />
      <Category />
      <ShowRoom />
      <Reels />
      <CardProduct />

      <Swiper
        className="w-full bg-black/30 bg-blur"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="w-full inset-0 object-cover"
            src={img1}
            alt="Picture of the author"
          />
        </SwiperSlide>
      </Swiper>

      <CategoryProducts type="Designer Kurti" />
      <Swiper
        className="w-full bg-black/30 bg-blur"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="w-full object-cover item-center"
            src={img2}
            alt="Picture of the author"
          />
        </SwiperSlide>
      </Swiper>

      <CategoryProducts type="Elegant Pant Pair" />

      <Swiper
        className="w-full bg-black/30 bg-blur"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="w-full object-cover item-center"
            src={img3}
            alt="Picture of the author"
          />
        </SwiperSlide>
      </Swiper>

      <CategoryProducts type="Royal Gown Collection" />

      <Swiper
        className="w-full bg-black/30 bg-blur"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="w-full object-cover item-center"
            src={img4}
            alt="Picture of the author"
          />
        </SwiperSlide>
      </Swiper>

      <CategoryProducts type="Chic Plaza Pair" />

      <Swiper
        className="w-full bg-black/30 bg-blur"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Image
            className="w-full object-cover item-center"
            src={img5}
            alt="Picture of the author"
          />
        </SwiperSlide>
      </Swiper>

      <CategoryProducts type="Trendy Indo Western Wear" />
      <CustomerExp />
      <Newsletter />
      <QualityProduct />
    </>
  );
};

export default DashBoard;
