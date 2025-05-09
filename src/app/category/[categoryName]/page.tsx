"use client";
import { use } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import axios from "axios";
import { useEffect } from "react";

type PageProps = {
  params: Promise<{ categoryName: string }>;
};

const Page = ({ params }: PageProps) => {
  const { categoryName } = use(params);
  const name = decodeURIComponent(categoryName);

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
      <CategoryProducts type={name} />
    </>
  );
};

export default Page;
