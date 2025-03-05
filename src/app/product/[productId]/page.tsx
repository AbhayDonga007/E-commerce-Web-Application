"use client";
import { ProductPage } from "@/components/ProductPage";
import { useSession } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { use } from "react";

type Props = {
  params: Promise<{ productId: string }>;
};

const ProductItem = ({ params }: Props) => {
  const { productId } = use(params); // Unwrap params using React.use()
  const session = useSession();
  const userId = session.session?.user.id;

  useEffect(() => {
    if (userId) {
      localStorage.clear();
    }
  }, [userId]);

  return (
    <div>
      <ProductPage id={productId} />
    </div>
  );
};

export default ProductItem;
