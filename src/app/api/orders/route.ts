export const dynamic = "force-dynamic";

import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/orders";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectMongoDB(); // Connect to MongoDB
  try {
    const { searchParams } = new URL(req.url);
    const customerEmail = searchParams.get("customerEmail")?.toLowerCase();
    const statusFilter = searchParams.get("status"); // Optional status filter
    const searchQuery = searchParams.get("search"); // Optional search query

    if (!customerEmail) {
      return NextResponse.json({ error: "Customer email is required." }, { status: 400 });
    }

    // Valid statuses from schema
    const validStatuses = ["ordered", "packed", "shipped", "out_for_delivery", "delivered"];

    // Build query object
    let query: any = { customerEmail };

    if (statusFilter && validStatuses.includes(statusFilter)) {
      query.status = statusFilter;
    }

    if (searchQuery) {
      query.$or = [
        { orderId: { $regex: searchQuery, $options: "i" } }, // Search orderId
        { "products.productId": { $regex: searchQuery, $options: "i" } }, // Search inside products
      ];
    }

    // Fetch orders and populate product details
    const orders = await Order.find(query).populate("products.productId");

    if (!orders.length) {
      return NextResponse.json({ error: "No orders found." }, { status: 404 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}
