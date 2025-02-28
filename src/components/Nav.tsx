"use client";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Logo from "./Logo";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { MenuIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardTitle } from "./ui/card";
import Search from "./Search";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Cart from "./Cart";
import CartComponent from "./Cart";

const items = [
  { key: "Designer Kurti", label: "Designer Kurti" },
  { key: "Elegant Pant Pair", label: "Elegant Pant Pair" },
  { key: "Royal Gown Collection", label: "Royal Gown Collection" },
  { key: "Chic Plaza Pair", label: "Chic Plaza Pair" },
  { key: "Trendy Indo Western Wear", label: "Trendy Indo Western Wear" },
  { key: "Stylish Crop-Top", label: "Stylish Crop-Top" },
  { key: "Modern Cord Set", label: "Modern Cord Set" },
  { key: "Graceful Tunics Collection", label: "Graceful Tunics Collection" },
  { key: "Luxury Dripping Sarees", label: "Luxury Dripping Sarees" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container pl-[4%] pr-[4%] flex h-14 max-w-screen-2xl items-center">
        <nav className="hidden flex flex-1 items-center space-x-6 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <Link
            className="text-gray-500 font-semibold text-base transition-colors hover:text-black"
            href="/products"
          >
            Products
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <div className="text-gray-500 font-semibold text-base transition-colors hover:text-black">
                Categories
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  href={`/category/${item.label}`}
                  variant="faded"
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <Link
            className="text-gray-500 font-semibold text-base transition-colors hover:text-black"
            href="/orders"
          >
            Orders
          </Link>
          <Link
            className="text-gray-500 font-semibold text-base transition-colors hover:text-black"
            href="/aboutus"
          >
            About us
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button isIconOnly className="shrink-0 md:hidden bg-transparent">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="/dashboard"
              >
                <Logo />
              </Link>
              {/* <Search /> */}
              <Link className="text-gray-500 hover:textblack" href="/dashboard">
                Dashboard
              </Link>
              <Link className="text-gray-500 hover:text-black" href="/orders">
                Orders
              </Link>
              <Link className="text-gray-500 hover:text-black" href="/products">
                Products
              </Link>
              {/* <Dropdown>
                <DropdownTrigger>
                  <div className="text-gray-500 transition-colors hover:text-black">
                    Categories
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      href={`/category/${item.label}`}
                      variant="faded"
                    >
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown> */}
              <Link className="text-gray-500 hover:text-black" href="/aboutus">
                About us
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="xl:hidden lg:hidden md:hidden">
          <Logo />
        </div>
        <div className="w-[60px] md:hidden"></div>
        <div className="flex items-center space-x-4">
          <div className="hidden xl:inline lg:inline md:inline">
            <Search />
          </div>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="cart-icon">
              <CartComponent />

              {/* {Boolean(5) && <span>{5}</span>}  */}
            </div>
            <div className="w-auto h-auto">
              <SignedOut>
                <Button
                  className="text-gray-500 transition-colors text-base border-0 font-semibold hover:text-black"
                  variant="ghost"
                >
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
