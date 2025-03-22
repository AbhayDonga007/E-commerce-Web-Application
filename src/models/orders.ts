import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    items: { type: Number, required: true },
    orderPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["ordered", "packed", "shipped", "out_for_delivery", "delivered"],
      default: "ordered",
    },    
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        productColor: { type: String },
        productSize: { type: String }
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
