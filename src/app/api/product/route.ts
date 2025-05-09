import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const product = await req.json();
    await connectMongoDB();
    await Product.create({
        name: product.name,
        des: product.des,
        type: product.type,
        size: product.size,
        customerPrize: product.customerPrize,
        productPrize: product.productPrize,
        retailPrize: product.retailPrize,
        artical_no: product.artical_no,
        color: product.color,
        images: product.images,
    });

    return NextResponse.json({ message: "Product Saved." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something is Wrong!" },
      { status: 500 }
    );
  }
}
