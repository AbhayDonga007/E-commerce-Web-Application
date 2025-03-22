// export const dynamic = "force-dynamic";

// // "use client";
// import { EmailForm } from "@/components/EmailForm";
// import { FilterBar } from "@/components/FilterBar";
// import Nav from "@/components/Nav";
// import { OrderCard } from "@/components/OrderCard";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Label } from "@/components/ui/label";
// import { useSession } from "@clerk/nextjs";
// import { Button, Input } from "@nextui-org/react";
// import axios from "axios";
// import { AlertCircle, Loader2 } from "lucide-react";
// import { Suspense, useEffect, useMemo, useState } from "react";

// // const mockOrders = [
// //   {
// //     status: "Delivered",
// //     customerName: "Abhay Donga",
// //     shippingAddress: "123 Main St, Anytown, AN 12345",
// //     customerPhone: "+1 (555) 123-4567",
// //     orderPrice: 129.99,
// //     items: 3,
// //     products: [
// //       { sku: "PROD-A", name: "Product A", status: "Delivered" },
// //       { sku: "PROD-B", name: "Product B", status: "Delivered" },
// //       { sku: "PROD-C", name: "Product C", status: "Returned", refundId: "REF001", refundAmount: 29.99 },
// //     ],
// //   },
// //   {
// //     status: "Processing",
// //     customerName: "Abhay Donga",
// //     shippingAddress: "456 Elm St, Somewhere, SW 67890",
// //     customerPhone: "+1 (555) 987-6543",
// //     orderPrice: 79.99,
// //     items: 2,
// //     products: [
// //       { sku: "PROD-D", name: "Product D", status: "Processing" },
// //       { sku: "PROD-E", name: "Product E", status: "Processing" },
// //     ],
// //   },
// // ]

// export default async function OrdersPage() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
//     cache: "no-store", // Prevents caching, ensures fresh data
//   });

//   // const [orders, setOrders] = useState([]);
//   const orders = res.ok ? await res.json() : [];

//   // useEffect(() => {
//   //   const getData = async () => {
//   //     const res = await axios.get(`/api/orders?userId=${userId}`);
//   //     console.log("Orders", res);

//   //     setOrders(res.data);
//   //   };

//   //   getData();
//   // }, [userId]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.includes("@")) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.get(
//         `/api/orders?customerEmail=${email}&status=${filter}&search=${search}`
//       );
//       setOrders(res.data);
//     } catch (err: any) {
//       setOrders([]);
//       setError(
//         err.response?.data?.error || "An error occurred while fetching orders."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Nav />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Customer Orders</h1>
//         {/* <form onSubmit={handleSubmit} className="space-y-4 mb-8"> */}
//         <div className="space-y-2 mb-5">
//           <Label htmlFor="email">Enter your email to view your orders</Label>
//           <div className="flex space-x-2">
//             <Input
//               id="email"
//               type="email"
//               placeholder="your@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="flex-grow"
//             />
//             <Button onClick={handleSubmit} type="submit">
//               View Orders
//             </Button>
//           </div>
//         </div>
//         {error && (
//           <div className="flex items-center space-x-2 text-destructive">
//             <AlertCircle className="h-4 w-4" />
//             <span className="text-sm">{error}</span>
//           </div>
//         )}
//         {/* </form> */}
//         {loading && (
//           <div className="flex justify-center items-center my-8">
//             <Loader2 className="h-8  w-8 animate-spin text-primary" />
//           </div>
//         )}
//         {error && (
//           <Alert variant="destructive" className="my-4">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <Suspense fallback={<p>Loading...</p>}>
//         {orders.length > 0 && (
//           <>
//             {/* <FilterBar onFilterChange={setFilter} onSearchChange={setSearch} /> */}
//             {orders.length > 0 ? (

//               <div className="space-y-6">
//                 {orders.map((order, index) => (
//                   <OrderCard key={index} order={order} />
//                 ))}
//               </div>
//             ) : (
//               <Alert className="my-4">
//                 <AlertTitle>No Results</AlertTitle>
//                 <AlertDescription>
//                   No orders match your current filter and search criteria.
//                 </AlertDescription>
//               </Alert>
//             )}
//           </>
//         )}
//         </Suspense>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, Suspense, FormEvent } from "react";
import Nav from "@/components/Nav";
import { Order, OrderCard } from "@/components/OrderCard";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";
import { useSession } from "@clerk/nextjs";
import { Alert, Input } from "@heroui/react";
import { Button } from "@nextui-org/button";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const session = useSession();
  const userId = session.session?.user.id;
  if (userId) {
    localStorage.clear();
  }

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get<Order[]>(
        `/api/orders?customerEmail=${email}`
      );
      console.log("Orders", res.data);

      setOrders(res.data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">View Your Orders</h2>
          <p className="text-default-500">
            Enter your email address to access your order history
          </p>
        </div>
        <div className="flex justify-center space-y-2 mb-5">
          <div className="w-[65%] space-y-4">
            <Input
              label="Email Address"
              variant="bordered"
              radius="sm"
              type="email"
              placeholder="your@email.com"
              value={email}
              onValueChange={setEmail}
              errorMessage={error}
              isInvalid={!!error}
              startContent={
                <Mail className="text-default-400 pointer-events-none flex-shrink-0" />
              }
              isDisabled={isLoading}
            />

            {success && (
              <Alert
                color="success"
                variant="bordered"
                startContent={<CheckCircle />}
              >
                Success! Redirecting to your orders...
              </Alert>
            )}

            <Button
              color="primary"
              size="lg"
              radius="sm"
              fullWidth
              onClick={handleSubmit}
              isLoading={isLoading}
              startContent={!isLoading && <ShoppingBag />}
            >
              {isLoading ? "Checking..." : "View Orders"}
            </Button>
          </div>
        </div>
        {error && (
          <Alert variant="bordered" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading && (
          <div className="flex justify-center items-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Suspense fallback={<p>Loading...</p>}>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </div>
          ) : (
            !loading && (
              <Alert className="my-4">
                <AlertTitle>No Results</AlertTitle>
                <AlertDescription>No orders found.</AlertDescription>
              </Alert>
            )
          )}
        </Suspense>
      </div>
    </>
  );
}
