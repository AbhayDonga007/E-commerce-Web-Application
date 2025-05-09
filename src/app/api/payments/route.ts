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
            amount: totalAmount * 100, 
            currency: "INR",
        };
          
        const order = await instance.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ message: "Payment Failed" }, { status: 500 });
    }
}
