import { Package, Phone, MapPin, User } from "lucide-react";
import { Badge, Card } from "@nextui-org/react";
import { CardContent, CardTitle } from "./ui/card";
import { ProgressTracker } from "./ProgressTracker";
import { PdfGenerator } from "./PdfGenerator";
import { Separator } from "./ui/separator";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export interface Product {
  _id: string;
}

export interface Order {
  _id: string;
  customerId: string;
  customerName: string;
  shippingAddress: string;
  customerEmail: string;
  customerPhone: string;
  orderPrice: number;
  items: number;
  status: string;
  products: Product[];
  paymentId: string;
  orderId: string;
}

interface OrderCardProps {
  order: Order;
}

const orderStatuses = [
  {
    status: "ordered",
    label: "Ordered",
    icon: <Package className="h-4 w-4" />,
  },
  { status: "packed", label: "Packed", icon: <Package className="h-4 w-4" /> },
  {
    status: "shipped",
    label: "Shipped",
    icon: <Package className="h-4 w-4" />,
  },
  {
    status: "out_for_delivery",
    label: "Out for Delivery",
    icon: <Package className="h-4 w-4" />,
  },
  {
    status: "delivered",
    label: "Delivered",
    icon: <Package className="h-4 w-4" />,
  },
];

export function OrderCard({ order }: OrderCardProps) {
  const currentStatusIndex = orderStatuses.findIndex(
    (s) => s.status === order.status
  );

  const handleSuccess = () => {
    toast.success(`Invoice for Order #${order._id} has been downloaded.`);
  };

  const handleError = () => {
    toast.error("Failed to generate invoice. Please try again.");
  };

  return (
    <Card className="w-full max-w-4xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-md font-semibold tracking-tight">
              Order #{order._id}
            </h2>
            <Badge
              variant="flat"
              className="bg-red-500"
            >
              {order.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
        <PdfGenerator
          order={order}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {order.customerEmail}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm">+91 {order.customerPhone}</p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm">{order.shippingAddress}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Items</span>
            <span className="font-medium">{order.items}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <span className="font-medium">₹ {order.orderPrice}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{
            width: `${
              (currentStatusIndex / (orderStatuses.length - 1)) * 100
            }%`,
          }}
        />
        <div className="relative grid grid-cols-5 gap-2">
          {orderStatuses.map((orderStatus, index) => {
            const isActive = index <= currentStatusIndex;
            return (
              <div
                key={orderStatus.status}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-muted text-muted-foreground"
                  )}
                >
                  {orderStatus.icon}
                </div>
                <span
                  className={cn(
                    "text-xs text-center",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {orderStatus.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
