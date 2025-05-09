export const dynamic = "force-dynamic"; 
import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/cart';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ message: "UserId not exist" }, { status: 400 });
        }
        await connectMongoDB()
        console.log(userId);
        

        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 201 });
        }
        
        return NextResponse.json(cart);
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Something is Wrong!" }, { status: 500 });
    }
}
