"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Pacifico } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import images
import img1 from "../images/designer-kurti.jpg";
import img2 from "../images/pant-pair.jpg";
import img3 from "../images/Gowns.jpg";
import img4 from "../images/plaza-pair.jpg";
import img5 from "../images/Indo-Western.jpg";
import img6 from "../images/crep-top.jpg";
import img7 from "../images/cord-set.jpg";
import img8 from "../images/tunic.jpg";
import img9 from "../images/saree.jpg";

interface CategoryCardProps {
  title: string;
  image: StaticImageData;
  slug: string;
}

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const libre = Libre_Baskerville({ subsets: ["latin"], weight: "700" });

const categories = [
  { title: "Designer Kurti", image: img1, slug: "Designer Kurti" },
  { title: "Elegant Pant Pair", image: img2, slug: "Elegant Pant Pair" },
  { title: "Royal Gown", image: img3, slug: "Royal Gown Collection" },
  { title: "Chic Plaza Pair", image: img4, slug: "Chic Plaza Pair" },
  {
    title: "Trendy Indo Western",
    image: img5,
    slug: "Trendy Indo Western-Wear",
  },
  { title: "Stylish Crop-Top", image: img6, slug: "Stylish Crop Top" },
  { title: "Modern Cord Set", image: img7, slug: "Modern Cord Set" },
  { title: "Graceful Tunics", image: img8, slug: "Graceful Tunics Collection" },
  {
    title: "Luxury Dripping Sarees",
    image: img9,
    slug: "Luxury Dripping Sarees",
  },
];

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, slug }) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2.5 relative group">
        <Card isFooterBlurred className="" shadow="lg" isPressable>
          <CardBody className="p-0">
            <Swiper
              className="w-full bg-black/30 bg-blur"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
            >
              <SwiperSlide className="">
                <Image
                  alt="Kurti"
                  className="object-cover w-full opacity-90 transition-opacity gap-y-3"
                  height={350}
                  src={image || "/placeholder.svg"}
                  width={350}
                />

                <Link
                  className="absolute inset-0 z-10"
                  href={`/category/${encodeURIComponent(slug)}`}
                />
              </SwiperSlide>
            </Swiper>
          </CardBody>
          <Divider />
          <CardFooter className="bottom-0 flex-col items-center">
            <h4 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase text-center">
              {title}
            </h4>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export function Category() {
  return (
    <section className="w-full flex justify-center py-8 overflow-hidden">
      <div className="container grid gap-6 md:gap-12 px-4 md:px-6">
        <div className="text-center items-center gap-4 md:gap-8">
          <div className="grid gap-4">
            <div className={pacifico.className}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                Shop by Category
              </h1>
            </div>
            <div className={libre.className}>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 text-center">
                Find Your Style, Embrace Fashion Forever!
              </p>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="flex justify-center p-2">
              <CategoryCard
                title={category.title}
                image={category.image}
                slug={category.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
