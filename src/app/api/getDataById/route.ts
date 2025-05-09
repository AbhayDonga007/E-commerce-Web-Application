export const dynamic = "force-dynamic"; 

import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      await connectMongoDB();

      const data = await Product.findOne({ _id: id });

      return NextResponse.json(data);
    // });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something is Wrong!" },
      { status: 500 }
    );
  }
}
