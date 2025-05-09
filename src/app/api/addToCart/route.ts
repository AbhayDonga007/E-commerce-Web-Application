import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/cart';
import Product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    try {
        const data = await req.json(); 
        console.log(data);
        
        await connectMongoDB();

        const product = await Product.findById(data.productId);

        let cart = await Cart.findOne({ userId: data.userId });

        if (!cart) {
            cart = new Cart({
                userId: data.userId,
                products: [{ productId: product._id, productQnt: data.productQnt , productSize:data.productSize, productColor: data.productColor}]
            });
        } else {
            const existingProduct = cart.products.find((p:any) => p.productId.equals(product._id));
            if (existingProduct) {
                existingProduct.productQnt += data.count;
            } else {
                cart.products.push({ productId: product._id, productQnt: data.productQnt, productSize:data.productSize, productColor: data.productColor });
            }
        }

        await cart.save();
        
        
        return NextResponse.json({ message: "Product Saved." }, { status: 201 });
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Something is Wrong!" }, { status: 500 });
    }
}
