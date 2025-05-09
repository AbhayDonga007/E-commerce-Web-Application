import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/cart';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    try {
        const data = await req.json();
        console.log(data);
        
        const userId = data.userId 
        const productId = data.productId
        
        await connectMongoDB();

        const cart = await Cart.findOne({ userId, 'products.productId': productId });
        
        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 400 });
        }
        const productIndex = cart.products.findIndex((product:any) => product.productId.toString() === productId);

        if (productIndex === -1) {
            return NextResponse.json({ message: "Cart not found" }, { status: 400 });
        }
        cart.products[productIndex].productQnt -= 1;
        if (cart.products[productIndex].productQnt <= 0) {
            cart.products.splice(productIndex, 1);
        }
        await cart.save();
        
        return NextResponse.json({ message: "Product Saved." }, { status: 201 });
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Something is Wrong!" }, { status: 500 });
    }
}
