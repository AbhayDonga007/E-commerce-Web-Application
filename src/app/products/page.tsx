"use client"
import { CardProduct } from "@/components/Card";
import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import QualityProduct from "@/components/QualityProduct";
import { useSession } from "@clerk/nextjs";
import React from "react";

type Props = {};

const Products = (props: Props) => {
  const session = useSession();
    const userId = session.session?.user.id;
      if(userId){
        localStorage.clear();
      }
  return (
    <div>
      <CardProduct />
      <QualityProduct />
    </div>
  );
};

export default Products;
