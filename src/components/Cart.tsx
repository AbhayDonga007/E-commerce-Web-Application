import { Cart, CartProduct, Product } from "@/lib/interface";
import { useSession } from "@clerk/nextjs";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
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
import { CardTitle } from "./ui/card";
import Link from "next/link";

const CartComponent = () => {
  const [list, setList] = useState<Cart | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();
  const userId = session.session?.user.id;

  useEffect(() => {
    const getCartData = async () => {
      if (!userId) {
        // Get guest cart from local storage
        const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        if (localCart.length === 0) {
          setList({ userId: "guest", products: [] });
          return;
        }

        // Fetch full product details
        const productIds = localCart.map((item: CartProduct) => item.productId);
        try {
          const res = await axios.post("/api/getProductsByIds", { productIds });
          const fullProducts: Product[] = res.data;

          // Map local cart with product details
          const formattedCart: Cart = {
            userId: "guest",
            products: localCart.map((item: CartProduct) => ({
              ...item,
              productId:
                fullProducts.find((p) => String(p._id) === String(item.productId)) ||
                ({} as Product),
            })),
          };

          setList(formattedCart);
        } catch (error) {
          console.error("Error fetching guest cart product details:", error);
        }
        return;
      }

      try {
        const res = await axios.get(`/api/getCartData?userId=${userId}`);
        setList(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    getCartData();
  }, [userId]);
  
  

  const handleInc = async (productId: string) => {
    try {
      await axios.post("/api/cartIncrement", { productId, userId });

      // Update state in real-time
      setList((prevList) => {
        if (!prevList) return prevList;
        return {
          ...prevList,
          products: prevList.products.map((item) =>
            item.productId._id === productId
              ? { ...item, productQnt: item.productQnt + 1 }
              : item
          ),
        };
      });
    } catch (error) {
      console.error("Error incrementing product quantity", error);
    }
  };

  const handleDec = async (productId: string) => {
    try {
      await axios.post("/api/cartDecrement", { productId, userId });

      // Update state in real-time
      setList((prevList) => {
        if (!prevList) return prevList;
        return {
          ...prevList,
          products: prevList.products
            .map((item) =>
              item.productId._id === productId
                ? { ...item, productQnt: item.productQnt - 1 }
                : item
            )
            .filter((item) => item.productQnt > 0), // Remove if quantity is 0
        };
      });
    } catch (error) {
      console.error("Error decrementing product quantity", error);
    }
  };

  return (
    <>
      <Badge
        isInvisible={!list?.products?.length}
        content={list?.products?.length}
        shape="circle"
        className="bg-red-500 text-white border-none"
      >
        <Button
          onPressStart={onOpen}
          isIconOnly
          className="bg-transparent"
          radius="full"
          size="md"
        >
          <ShoppingCart />
        </Button>
      </Badge>
      <Modal
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
        className="min-h-[550px] max-w-[800px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cart Items</ModalHeader>
              <ModalBody>
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                  {list?.products?.map((item, index) => (
                    <Card
                      className="max-h-[400px]"
                      shadow="sm"
                      key={index}
                      isPressable
                      onPress={() => console.log("item pressed")}
                    >
                      <CardHeader>
                        <CardTitle className="truncate text-nowrap text-sm capitalize">
                          {item.productId.name}
                        </CardTitle>
                      </CardHeader>
                      <CardBody className="overflow-visible p-0 m-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.productId.name}
                          className="w-full max-h-[250px] object-cover"
                          src={item.productId.images[0]}
                        />
                      </CardBody>
                      <div className="overflow-hidden text-small text-left text-balance mr-2 max-h-[40px] text-gray-500 ml-2 pt-1">
                        {item.productId.des} ₹
                      </div>
                      <CardFooter className="flex text-small truncate justify-between">
                        <ButtonGroup size="sm">
                          <Button
                            onClick={() => handleInc(item.productId._id)}
                            className="font-bold bg-red-200"
                            size="sm"
                            isIconOnly
                            radius="full"
                          >
                            +
                          </Button>
                          <div className="w-7 font-bold">{item.productQnt}</div>
                          <Button
                            onClick={() => handleDec(item.productId._id)}
                            className="font-bold bg-red-200"
                            size="sm"
                            isIconOnly
                            radius="full"
                          >
                            -
                          </Button>
                        </ButtonGroup>
                        <div className="text-default-700 font-bold">
                          {item.productQnt * item.productId.customerPrize} ₹
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Link href="/payment">
                  <Button color="danger" variant="solid" onPress={onClose}>
                    Place Order
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartComponent;
