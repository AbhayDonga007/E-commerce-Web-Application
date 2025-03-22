"use client";
import Nav from "@/components/Nav";
import { useSession } from "@clerk/nextjs";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Razorpay from "razorpay";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import crypto from "crypto";
import GooglePayButton from "@google-pay/button-react";

export interface Product {
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

export interface CartProduct {
  productId: Product;
  productQnt: number;
  productSize: string;
  productColor: string;
}

export interface Cart {
  userId: string;
  products: CartProduct[];
}

type Props = {};

const Page = (props: Props) => {
  const [list, setList] = useState<Cart>();

  const session = useSession();
  const userId = session.session?.user.id;
  if (userId) {
    localStorage.clear();
  }
  const [customerdetail, setCustomerDetail] = useState({
    id: userId || "guest",
    name: "",
    email: "",
    phone: 0,
    address: "",
  });

  useEffect(() => {
    const getCartData = async () => {
      if (!userId) {
        const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        if (localCart.length === 0) {
          setList({ userId: "guest", products: [] });
          return;
        }

        const productIds = localCart.map((item: CartProduct) =>
          String(item.productId?._id || item.productId)
        );

        console.log("productIds", productIds);

        try {
          const res = await axios.post("/api/getProductsByIds", { productIds });
          const fullProducts: Product[] = res.data;
          console.log("fullProducts", fullProducts);

          const formattedCart: Cart = {
            userId: "guest",
            products: localCart.map((item: CartProduct) => {
              const product = fullProducts.find(
                (p) =>
                  String(p._id) ===
                  String(item.productId?._id || item.productId)
              );

              if (!product) {
                console.warn("Product not found for ID:", item.productId);
              }

              return {
                ...item,
                productId: product || null,
              };
            }),
          };

          console.log("formattedCart", formattedCart);
          setList(formattedCart);
        } catch (error) {
          console.error("Error fetching guest cart product details:", error);
        }
        return;
      }

      try {
        const res = await axios.get(`/api/getCartData?userId=${userId}`);
        console.log("Fetched user cart data:", res.data);
        setList(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    getCartData();
  }, [userId]);

  //  Razorpay
  const MakePayment = async () => {
    console.log(list?.products);

    if (
      customerdetail.name === "" ||
      customerdetail.email === "" ||
      customerdetail.phone === 0
    ) {
      toast.error("Please fill all the details");
      return;
    }

    const body = {
      products: list?.products,
    };

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
      amount: Number(data.order.amount * 100),
      currency: "INR",
      name: "Eroe Designer",
      description: "Test Transaction",
      order_id: data.order.id,
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
              totalAmount: data.order.amount / 100,
              products: list?.products,
            },
            customer: customerdetail,
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
        name: customerdetail.name,
        email: customerdetail.email,
        contact: customerdetail.phone,
      },
      notes: {
        address: customerdetail.address,
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

  // async function MakePayment(): Promise<void> {
  //   if (
  //     !customerdetail.name ||
  //     !customerdetail.email ||
  //     !customerdetail.phone
  //   ) {
  //     toast.error("Please fill all the details");
  //     return;
  //   }

  //   const body = { products: list?.products };
  //   const res = await fetch("/api/payments", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });

  //   const data = await res.json();
  //   console.log("Payment Response:", data);
  // }

  return (
    <>
      <div
        key="1"
        className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-300"
      >
        <div className="w-full max-w-[900px] space-y-6 bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-2 justify-center flex items-center text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Details
            </h1>
          </div>
          <div className="space-y-4 pl-[20%] pr-[20%]">
            <form onSubmit={MakePayment} className="space-y-6">
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="w-full flex flex-col gap-4">
                      <div
                        key="md"
                        className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                      >
                        <Input
                          onChange={(e) =>
                            setCustomerDetail({
                              ...customerdetail,
                              name: e.target.value,
                            })
                          }
                          size="md"
                          type="text"
                          label="Customer Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full flex flex-col gap-4">
                      <div
                        key="md"
                        className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                      >
                        <Input
                          onChange={(e) =>
                            setCustomerDetail({
                              ...customerdetail,
                              email: e.target.value,
                            })
                          }
                          size="md"
                          type="email"
                          label="Customer Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full flex flex-col gap-4">
                      <div
                        key="md"
                        className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                      >
                        <Input
                          onChange={(e) =>
                            setCustomerDetail({
                              ...customerdetail,
                              phone: Number(e.target.value),
                            })
                          }
                          size="md"
                          type="number"
                          min={10}
                          max={10}
                          label="Customer Contact No"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full flex flex-col gap-4">
                      <div
                        key="md"
                        className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                      >
                        <Textarea
                          onChange={(e) =>
                            setCustomerDetail({
                              ...customerdetail,
                              address: e.target.value,
                            })
                          }
                          label="Enter Full Shipping Address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  // color="danger"
                  onClick={MakePayment}
                  className="w-full font-bold text-white bg-red-600 hover:text-red-500 hover:bg-red-200"
                >
                  Make Payment
                </Button>
                {/* <GooglePayButton
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "BCR2DN4T777KLLDR",
                      merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: "1",
                      currencyCode: "INR",
                      countryCode: "IN",
                    },
                    shippingAddressRequired: false,
                    callbackIntents: ["PAYMENT_AUTHORIZATION"],
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log("Success", paymentRequest);
                  }}
                  onPaymentAuthorized={(paymentData) => {
                    console.log("Payment Authorised Success", paymentData);
                    return { transactionState: "SUCCESS" };
                  }}
                  existingPaymentMethodRequired={false}
                  buttonColor="black"
                  buttonType="buy"
                /> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
