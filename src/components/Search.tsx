import { useSession } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};
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

const Search = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const res = await axios.get(`/api/getDataByName?name=${search}`);
    setSearchData(res.data);
  };
  return (
    <div className="relative ml-auto flex-1 sm:flex-initial">
      <Button className="p-0 m-0 bg-transparent" onPressStart={onOpen}>
        <Input
          isClearable
          radius="md"
          classNames={{
            label: "text-black/50",
            input: [
              "bg-transparent",
              "text-black/90",
              "placeholder:text-black-400/50",
            ],
            innerWrapper: "bg-transparent",
          }}
          placeholder=" Search"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 pointer-events-none flex-shrink-0" />
          }
        />
      </Button>
      <Modal
        backdrop="blur"
        scrollBehavior="inside"
        size="2xl"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-[97%]">
                <Input
                  onChange={onSearch}
                  isClearable
                  radius="lg"
                  classNames={{
                    label: "text-black/50",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-black-400/50",
                    ],
                    innerWrapper: "bg-transparent",
                  }}
                  placeholder="Type to search..."
                  startContent={
                    <SearchIcon className="text-black/50 mb-0.5 text-black pointer-events-none flex-shrink-0" />
                  }
                />
              </ModalHeader>
              <ModalBody>
                {searchData.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 xl:gap-4">
                    {searchData.map((item: Product, index) => {
                      const productPrize = item.productPrize ?? 0;
                      const customerPrize = item.customerPrize ?? 0;

                      const discount =
                        productPrize !== 0
                          ? ((productPrize - customerPrize) / productPrize) *
                            100
                          : 0;
                      return (
                        <div key={index} className="grid">
                          <div className="grid relative group">
                            <Card
                              isFooterBlurred
                              // xl:min-h-[390px] min-h-[270px] max-h-[500px]
                              className="rounded-lg bg-gray-200"
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
                              <CardBody className="p-0 bg-transparent">
                                <Swiper
                                  className="w-full"
                                  modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                  ]}
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
                      );
                    })}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

function SearchIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default Search;
