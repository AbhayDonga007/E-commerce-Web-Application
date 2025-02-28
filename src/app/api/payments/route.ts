import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from "next/server";
import { instance } from '@/lib/server';
import { CartProduct } from '@/lib/interface';

export async function POST(req:NextRequest) {
    try {
        const cart = await req.json();
        console.log("Cart:", cart);

        // Ensure cart.products is an array before reducing
        if (!Array.isArray(cart.products)) {
            return NextResponse.json({ message: "Invalid cart data" }, { status: 400 });
        }

        // Calculate total amount correctly
        const totalAmount = cart.products.reduce((total: number, cartProduct: CartProduct) => {
            if (!cartProduct.productId || typeof cartProduct.productId.customerPrize !== "number") {
                console.warn("Invalid product data:", cartProduct);
                return total; // Skip invalid products
            }
            
            const productPrice = cartProduct.productId.customerPrize;
            const quantity = cartProduct.productQnt || 1; // Default to 1 if missing

            console.log(`Product Price: ${productPrice}, Quantity: ${quantity}`);

            return total + (productPrice * quantity);
        }, 0);

        console.log("Total Amount:", totalAmount);
        
        
        const options = {
            amount: totalAmount * 100,
            currency: "INR"
          };
          
        const order = await instance.orders.create(options)

        console.log({cart,order});
        return NextResponse.json({cart,order});
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Payment Failed" }, { status: 500 });
    }
}


// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const paymentData = req.body;

//     // TODO: Verify & process payment via Stripe/Razorpay backend
//     console.log("Received payment data:", paymentData);

//     res.status(200).json({ success: true, message: "Payment successful!" });
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
