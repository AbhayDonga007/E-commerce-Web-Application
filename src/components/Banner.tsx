import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

import b1 from "@/images/banner5.png";
import b3 from "@/images/banner1.png";
import b4 from "@/images/banner2.png";
import b5 from "@/images/banner3.png";
import b6 from "@/images/banner4.png";
import b7 from "@/images/banner7.png";
import b8 from "@/images/banner6.png";
import b9 from "@/images/banner8.png";
import b10 from "@/images/banner9.png";

type Props = {};

const Banner = (props: Props) => {
  return (
    <Swiper
      className="max-h-[90vh] bg-black/30 bg-blur"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <Image className="object-cover" src={b1} alt="Picture of the author" />
      </SwiperSlide>
      <SwiperSlide>
        <Image className="object-cover" src={b3} alt="Picture of the author" />
      </SwiperSlide>
      <SwiperSlide>
        <Image className="object-cover" src={b7} alt="Picture of the author" />
      </SwiperSlide>
      <SwiperSlide>
        <Image className="object-cover" src={b8} alt="Picture of the author" />
      </SwiperSlide>
      <SwiperSlide>
        <Image className="object-cover" src={b9} alt="Picture of the author" />
      </SwiperSlide>
      <SwiperSlide>
        <Image className="object-cover" src={b10} alt="Picture of the author" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
