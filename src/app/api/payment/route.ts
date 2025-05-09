import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req:NextRequest) {
    try {
        const cart = await req.json();
        const lineItems = cart.products.map((product:any) => ({
              price_data: {
                currency: "inr",
                product_data: {
                  name: product.productId.name,
                },
                unit_amount: Math.round(product.productId.customerPrize * 100),
              },
              quantity: product.productQnt,
          }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://eroe-designer.vercel.app/",
            cancel_url: "https://eroe-designer.vercel.app/",
          });
        
        return NextResponse.json({ id: session.id }, { status: 201 });
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 500 });
    }
}
