import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
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
import Link from "next/link";
import { CardTitle } from "./ui/card";

const CartComponent = () => {
  const { cart, handleInc, handleDec } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  return (
    <>
      <Badge
        isInvisible={!cart?.products?.length}
        content={cart?.products?.length}
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
              <ModalHeader className="flex flex-col gap-1">
                Cart Items
              </ModalHeader>
              <ModalBody>
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                  {cart?.products?.map((item, index) => (
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
                          src={
                            item.productId?.images?.[0] || "/placeholder.jpg"
                          }
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
