export const dynamic = "force-dynamic"; 
import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        console.log("searchParams",searchParams);
        
        const type = searchParams.get('type');
        console.log(type);
        
        await connectMongoDB()

        const data = await Product.find({ type: type }).sort('name');
                
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Something is Wrong!" }, { status: 500 });
    }
}
