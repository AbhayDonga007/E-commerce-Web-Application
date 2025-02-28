"use client";
import CategoryProducts from "@/components/CategoryProducts";
import Nav from "@/components/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  params: {
    categoryName: string;
  };
};

const Page = ({ params }: Props) => {
  // Decode category name to handle spaces correctly
  const name = decodeURIComponent(params.categoryName);

  useEffect(() => {
    const getData = async () => {
      try {
        await axios.get(`/api/getDataByType?type=${encodeURIComponent(name)}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [name]);

  return (
    <>
      <Nav />
      <CategoryProducts type={name} />
    </>
  );
};

export default Page;
