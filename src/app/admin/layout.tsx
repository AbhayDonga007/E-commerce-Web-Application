import type React from "react";
// import "./global.css"
import "../globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
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
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  { icon: Home, label: "Dashboard", active: true,route: "/admin" },
  {
    icon: Package,
    label: "Products",
    // hasSubmenu: true,
    route: "/admin/products",
  },
  { icon: Home, label: "Add Products", route: "/admin/addProduct", },
  // { icon: ShoppingCart, label: "Orders", hasSubmenu: true },
  // { icon: Users, label: "Customers", hasSubmenu: true },
  // { icon: BarChart2, label: "Statistics" },
  // { icon: MessageSquare, label: "Reviews" },
  // { icon: Receipt, label: "Transactions", badge: "3" },
  // { icon: Store, label: "Sellers" },
  // { icon: Tag, label: "Hot offers" },
  // { icon: Paintbrush, label: "Appearance", hasSubmenu: true },
  // { icon: Settings, label: "Settings" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-background">
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              A
            </div>
            <span className="font-semibold">Admin</span>
          </div>
          <nav className="space-y-1 p-2">
            {menuItems.map((item,index) => (
              <Link key={index} className="" href={`${item.route}`}>
                <Button
                  key={item.label}
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    item.active &&
                      "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 overflow-auto">
          <div>{children}</div>
        </main>
        </div>
      </body>
    </html>
  );
}
