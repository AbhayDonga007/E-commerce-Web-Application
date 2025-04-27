import { instance } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { totalAmount } = await req.json(); 
        console.log("Total Amount:", totalAmount);
        
        if (!totalAmount || typeof totalAmount !== "number") {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
        };
          
        const order = await instance.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
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
