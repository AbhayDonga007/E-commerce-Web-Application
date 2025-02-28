"use client"
import { ProductPage } from "@/components/ProductPage";
import { Cart, CartProduct, Product } from "@/lib/interface";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  params: {
    productId: string;
  };
};

const ProductItem =async ({ params }: Props) => {
  const session = useSession();
    const userId = session.session?.user.id;
      if(userId){
        localStorage.clear();
      }
  
  return(
    <div>
        <ProductPage id={params.productId}/>
    </div>
  )
};

export default ProductItem;

