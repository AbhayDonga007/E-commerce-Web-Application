// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.text();
//         const params = new URLSearchParams(body);
//         console.log("Verification", params);

//         const razorpay_order_id = params.get('razorpay_order_id');
//         const razorpay_payment_id = params.get('razorpay_payment_id');
//         const razorpay_signature = params.get('razorpay_signature');

//         const temp = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto.createHmac('sha256',process.env.ROZORPAY_SECRET_KEY!).update(temp.toString()).digest('hex');

//         if (expectedSignature === razorpay_signature) {
//             return NextResponse.redirect(new URL("/api/orders", req.url),200);
//         } else {
//             return NextResponse.json({ message: "Invalid Signature", signatureIsValid: false,success:false }, { status: 400 });
//         }

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Method Not Allowed" }, { status: 500 });
//     }
// }

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

    // Save the order to the database
    const newOrder = await Order.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      // amount: cart.totalAmount,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: customer.address,
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

    // Clear Cart (Assuming you use session storage or database for the cart)
    // If using database-based cart system:
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
