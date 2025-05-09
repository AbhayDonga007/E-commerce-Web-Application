import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cart";
import Order from "@/models/orders";
import { CartProduct } from "@/lib/interface";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      cart,
      customer,
    } = body;

    const temp = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.ROZORPAY_SECRET_KEY!).update(temp.toString()).digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Payment Verification Failed" },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: customer.address,
      country: customer.country,
      state: customer.state,
      pincode: customer.pincode,
      items: cart.products.length,
      orderPrice: cart.totalAmount,
      products: cart.products.map((product: CartProduct) => ({
        productId: product.productId,
        quantity: product.productQnt || 1,
        productColor: product.productColor,
        productSize: product.productSize
      })),
      status: "ordered",
    });

    console.log("Order Stored:", newOrder);

    await Cart.deleteOne({ userId: customer.id });

    return NextResponse.json({ message: "Payment Successful, Order Stored" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { message: "Payment Verification Failed" },
      { status: 500 }
    );
  }
}
