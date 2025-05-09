"use client";

import type React from "react";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { useCart } from "@/context/CartContext";
import { CardTitle } from "./ui/card";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useSession } from "@clerk/nextjs";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerDetails {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  country: string;
  pincode: number;
}

export default function OrderModal() {
  const [open, setOpen] = useState(false);
  const { cart, handleInc, handleDec } = useCart();
  const session = useSession();
  const userId = session.session?.user.id;
  console.log(cart);

  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "details" | "payment"
  >("cart");

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    id: userId || "guest",
    name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    country: "India",
    pincode: 0,
  });

  const subtotal =
    cart?.products.reduce(
      (total, item) => total + item.productId.customerPrize * item.productQnt,
      0
    ) || 0;
  const sgstRate = 0.06;
  const cgstRate = 0.06;
  const sgstAmount = subtotal * sgstRate;
  const cgstAmount = subtotal * cgstRate;
  const totalTax = sgstAmount + cgstAmount;
  const totalAmount = subtotal + totalTax;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setCustomerDetails((prev) => ({ ...prev, state: value }));
  };

  const resetCheckout = () => {
    setCheckoutStep("cart");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setCheckoutStep("cart");
    }
  };

  const MakePayment = async () => {
    setOpen(false);
    const body = { totalAmount };

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Payment Response:", data);

    const options = {
      key: process.env.ROZORPAY_API_KEY,
      amount: Number(data.amount * 100),
      currency: "INR",
      name: "Aavkar Fashion",
      description: "Test Transaction",
      order_id: data.id,
      handler: async function (response: any) {
        console.log("Payment Success:", response);

        const verifyRes = await fetch("/api/paymentVerification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            cart: {
              totalAmount: data.amount / 100,
              products: cart?.products,
            },
            customer: customerDetails,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.message === "Payment Successful, Order Stored") {
          toast.success("Order placed successfully!");
        } else {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
      notes: {
        address: customerDetails.address,
      },
      theme: {
        hide_topbar: true,
        color: "#121212",
      },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function () {
      toast.error("Payment Failed, Redirecting...");
      window.location.href = "/dashboard";
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <Badge
          isInvisible={!cart?.products?.length}
          content={cart?.products?.length}
          shape="circle"
          className="bg-red-500 text-white border-none"
        >
          <DialogTrigger asChild>
            <Button
              isIconOnly
              className="bg-transparent"
              radius="full"
              size="md"
            >
              <ShoppingCart />
            </Button>
          </DialogTrigger>
        </Badge>
        <DialogContent className="max-w-[800px] max-h-[97vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {checkoutStep === "cart"
                ? "Cart Items"
                : checkoutStep === "details"
                ? "Customer Details"
                : "Payment"}
            </DialogTitle>
          </DialogHeader>

          {checkoutStep === "cart" && (
            <div className="space-y-6">
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
                      <CardTitle className="truncate text-nowrap text-sm">
                        {item.productId.name}
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="overflow-visible p-0 m-0 ">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={item.productId.name}
                        className="w-full max-h-[250px] object-cover"
                        src={item.productId?.images?.[0] || "/placeholder.jpg"}
                      />
                    </CardBody>
                    <div className="flex justify-center gap-2 mt-1 mb-0 text-[14px] text-default-500 font-semibold">
                      <div>Size: {item.productSize}</div>
                      <div>Color: {item.productColor}</div>
                    </div>
                    <CardFooter className="flex text-small truncate pt-1 justify-between">
                      <ButtonGroup
                        size="sm"
                        className="bg-red-200 rounded-full"
                      >
                        <Button
                          onClick={() => handleInc(item.productId._id)}
                          className="font-bold bg-red-200 hover:bg-red-400"
                          size="sm"
                          isIconOnly
                          radius="full"
                        >
                          +
                        </Button>
                        <div className="w-7 font-bold">{item.productQnt}</div>
                        <Button
                          onClick={() => handleDec(item.productId._id)}
                          className="font-bold bg-red-200 hover:bg-red-400"
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

              <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-[18px]">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">{subtotal.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">SGST (9%)</div>
                  <div className="font-medium">{sgstAmount.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">CGST (9%)</div>
                  <div className="font-medium">{cgstAmount.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Total Tax</div>
                  <div className="font-medium">{totalTax.toFixed(2)} ₹</div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <div className="font-bold">Total Amount</div>
                  <div className="font-bold">{totalAmount.toFixed(2)} ₹</div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="w-full font-bold text-white bg-red-600 hover:text-red-700 hover:bg-red-200"
                  onClick={() => setCheckoutStep("details")}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}

          {checkoutStep === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                    pattern="\d{10}"
                    title="Phone number must be exactly 10 digits"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={customerDetails.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={customerDetails.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={customerDetails.pincode}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,6}$/.test(value)) {
                        handleInputChange(e);
                      }
                    }}
                    pattern="\d{6}"
                    title="Pincode must be exactly 6 digits"
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                <div className="font-semibold text-[18px]">Order Summary</div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">{subtotal.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Total Tax (SGST + CGST)</div>
                  <div className="font-medium">{totalTax.toFixed(2)} ₹</div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <div className="font-bold">Total Amount</div>
                  <div className="font-bold">{totalAmount.toFixed(2)} ₹</div>
                </div>
              </div>

              <div className="flex justify-center gap-5">
                <Button
                  className="w-full font-bold text-white bg-black hover:text-black/80 hover:bg-gray-300"
                  type="button"
                  onPressChange={resetCheckout}
                >
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  className="w-full font-bold text-white bg-red-600 hover:text-red-700 hover:bg-red-200"
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          )}

          {checkoutStep === "payment" && (
            <div>
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <div className="font-semibold text-[18px]">
                  Shipping Details
                </div>
                <div className="bg-muted/40 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between text-sm">
                    <div className="font-medium text-[15px]">Name</div>
                    <div className="font-medium">{customerDetails.name}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="font-medium text-[15px]">Phone</div>
                    <div className="font-medium">{customerDetails.phone}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="font-medium text-[15px]">Email</div>
                    <div className="font-medium">{customerDetails.email}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="font-medium text-[15px]">Address</div>
                    <div className="font-medium">{customerDetails.address}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="font-medium text-[15px]">
                      State/Country/PIN
                    </div>
                    <div className="font-medium">
                      {customerDetails.state}, {customerDetails.country},{" "}
                      {customerDetails.pincode}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-[18px]">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Subtotal</div>
                  <div className="font-medium">{subtotal.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">SGST (9%)</div>
                  <div className="font-medium">{sgstAmount.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">CGST (9%)</div>
                  <div className="font-medium">{cgstAmount.toFixed(2)} ₹</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="font-medium">Total Tax</div>
                  <div className="font-medium">{totalTax.toFixed(2)} ₹</div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <div className="font-bold">Total Amount</div>
                  <div className="font-bold">{totalAmount.toFixed(2)} ₹</div>
                </div>
              </div>

              <div className="flex justify-center gap-5">
                <Button
                  className="w-full font-bold text-white bg-black/80 hover:text-black hover:bg-gray-300"
                  onClick={() => setCheckoutStep("details")}
                >
                  Edit Details
                </Button>
                <Button
                  onClick={MakePayment}
                  className="w-full font-bold text-white bg-red-600 hover:text-red-700 hover:bg-red-200"
                >
                  Make Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
