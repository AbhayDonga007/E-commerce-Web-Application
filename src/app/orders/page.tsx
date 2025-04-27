"use client";

import { useState, useEffect, Suspense, FormEvent } from "react";
import Nav from "@/components/Nav";
import { Order, OrderCard } from "@/components/OrderCard";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
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
