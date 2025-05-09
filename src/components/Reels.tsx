"use client";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pacifico, Libre_Baskerville } from "next/font/google";

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

const videoPaths = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
  "/videos/video7.mp4",
  "/videos/video8.mp4",
];

export function Reels() {
  return (
    <section className="w-full flex justify-center py-6">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className={`${pacifico.className}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Watch & Shop</h1>
          </div>
          <div className={`${libre.className}`}>
            <p className="text-sm sm:text-base md:text-lg text-gray-500">
              See It. Love It. Own It. Shop Instantly!
            </p>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          pagination={{ clickable: true, dynamicBullets: true }}
          // navigation
          scrollbar={{ draggable: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {videoPaths.map((src, index) => (
            <SwiperSlide key={index}>
              <Card isFooterBlurred shadow="lg" isPressable>
                <CardBody className="p-0">
                  <video
                    src={src}
                    className="object-cover aspect-[9/16] w-full opacity-90"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
