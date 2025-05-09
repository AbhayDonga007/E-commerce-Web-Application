export const dynamic = "force-dynamic"; 
import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
    try {
        await connectMongoDB(); 
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        let query = {};
        query = {
            name: { $regex: name, $options: "i" }
        };
        
        const data = await Product.find(query);
        
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: "Something is Wrong!" }, { status: 500 });
    }
}
