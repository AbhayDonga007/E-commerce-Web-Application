"use client";

import { useState } from "react";
import {
  BarChart,
  DollarSign,
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart2,
  MessageSquare,
  Receipt,
  Store,
  Tag,
  Paintbrush,
  Settings,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";



const orders = [
  {
    id: "2323",
    name: "Devon Lane",
    email: "devon@example.com",
    amount: "$778.35",
    status: "Delivered",
    date: "07.05.2020",
  },
  {
    id: "2458",
    name: "Darrell Steward",
    email: "darrell@example.com",
    amount: "$219.78",
    status: "Delivered",
    date: "03.07.2020",
  },
  {
    id: "6289",
    name: "Darlene Robertson",
    email: "darlene@example.com",
    amount: "$928.41",
    status: "Cancelled",
    date: "23.03.2020",
  },
  {
    id: "3869",
    name: "Courtney Henry",
    email: "courtney@example.com",
    amount: "$90.51",
    status: "Pending",
    date: "04.07.2020",
  },
  {
    id: "1247",
    name: "Eleanor Pena",
    email: "eleanor@example.com",
    amount: "$275.43",
    status: "Delivered",
    date: "10.03.2020",
  },
  {
    id: "3961",
    name: "Ralph Edwards",
    email: "ralph@example.com",
    amount: "$630.44",
    status: "Delivered",
    date: "23.03.2020",
  },
];

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 overflow-auto">
        <div className="flex h-16 items-center justify-between border-b px-8">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="p-8">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$19,626,058.20</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3290</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">322</div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Latest Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "success"
                              : order.status === "Pending"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
