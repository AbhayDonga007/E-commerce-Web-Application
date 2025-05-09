"use client";
import { Label } from "@/components/ui/label";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo";
import toast from "react-hot-toast";
interface Product {
  name: string;
  des: string;
  type: Array<string>;
  size: Array<string>;
  customerPrize: number;
  productPrize: number;
  retailPrize: number;
  artical_no: string;
  color: Array<string>;
  images: Array<string>;
}

const Page = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    des: "",
    type: [],
    size: [],
    customerPrize: 0,
    productPrize: 0,
    retailPrize: 0,
    artical_no: "",
    color: [],
    images: [],
  });
  const types = [
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
  const sizes = [
    { key: "L", label: "L" },
    { key: "M", label: "M" },
    { key: "S", label: "S" },
    { key: "XL", label: "XL" },
    { key: "XXL", label: "XXL " },
    { key: "3XL", label: "3XL " },
    { key: "4XL", label: "4XL " },
    { key: "5XL", label: "5XL " },
  ];

  const colors = [
    { key: "Batali", label: "Batali" },
    { key: "Bit", label: "Bit" },
    { key: "Black", label: "Black" },
    { key: "Blue", label: "Blue" },
    { key: "Brown", label: "Brown" },
    { key: "Chiku", label: "Chiku" },
    { key: "Coffee", label: "Coffee" }, 
    { key: "Cream", label: "Cream" },
    { key: "Gajari", label: "Gajari" },
    { key: "Gajri", label: "Gajri" },
    { key: "Green", label: "Green" },
    { key: "Grey", label: "Grey" },
    { key: "Lavender", label: "Lavender" }, 
    { key: "Lemon", label: "Lemon" },
    { key: "Lining", label: "Lining" },
    { key: "Light Grey", label: "Light Grey" }, 
    { key: "Multi", label: "Multi" }, 
    { key: "Maroon", label: "Maroon" },
    { key: "Mustard", label: "Mustard" }, 
    { key: "Mehndi", label: "Mehndi" }, 
    { key: "Navy Blue", label: "Navy Blue" },
    { key: "Off White", label: "Off White" },
    { key: "Onion", label: "Onion" }, 
    { key: "Parrot Green", label: "Parrot Green" }, 
    { key: "Peach", label: "Peach" }, 
    { key: "Pista", label: "Pista" },
    { key: "Purple", label: "Purple" }, 
    { key: "Rama Green", label: "Rama Green" },
    { key: "Rani", label: "Rani" },
    { key: "Rani Pink", label: "Rani Pink" },
    { key: "Running", label: "Running" }, 
    { key: "Rash", label: "Rash" },
    { key: "Red", label: "Red" },
    { key: "Sky Blue", label: "Sky Blue" }, 
    { key: "Wine", label: "Wine" }, 
    { key: "White", label: "White" },
    { key: "Yellow Multi", label: "Yellow Multi" },   
    { key: "Yellow", label: "Yellow" },
];


  const handleSubmit = async () => {

    const res = await fetch("/api/product", {
      method: "POST",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        // Accept : "application/json",
        // "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify(product),
    });

    if (res.status === 201) {
      toast.success("Product Added Successfully");
    } else {
      toast.error("Something is wrong");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    console.log(files);
    let reader = new FileReader();
    if (files![0]) {
      reader.readAsDataURL(files![0]);
    }

    reader.onload = (e) => {
      // console.log(reader.result);
      setProduct({
        ...product,
        images: [...product.images, reader.result as string],
      });
    };
    reader.onerror = () => {
      console.log("Error");
    };

    // const selectedFiles = Array.from(e.target.files);
    // console.log(selectedFiles);

    // selectedFiles.forEach((image) => {
    //   let reader = new FileReader();

    //   if (image) {
    //     reader.readAsDataURL(image);
    //   }

    //   reader.onload = (e) => {
    //     console.log(image,reader.result);
    //     setProduct({...product , images:[...product.images,reader.result as string]})
    //   }
    //   reader.onerror = () => {
    //     console.log("Error");

    //   }
    // });
  };

  return (
    <div
      key="1"
      className="flex flex-col items-center justify-center min-h-screen py-4 sm:px-6 lg:px-8 bg-gray-300"
    >
      <div className="w-full max-w-[900px] space-y-6 bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-2 justify-center flex items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <Logo />
          </h1>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({ ...product, name: e.target.value })
                        }
                        size="md"
                        type="text"
                        label="Product Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({ ...product, des: e.target.value })
                        }
                        size="md"
                        type="text"
                        label="Product Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Select
                        label="Product Type"
                        // selectionMode="multiple"
                        className="max-w-xs"
                        onChange={(e) =>
                          setProduct({ ...product, type: [e.target.value] })
                        }
                      >
                        {types.map((type) => (
                          <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Select
                    label="Product Size"
                    selectionMode="multiple"
                    className="max-w-xs"
                    onChange={(e) =>
                      setProduct({ ...product, size: [e.target.value] })
                    }
                  >
                    {sizes.map((size) => (
                      <SelectItem key={size.key}>{size.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            customerPrize: Number(e.target.value),
                          })
                        }
                        size="md"
                        type="number"
                        label="Customer Prize"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            productPrize: Number(e.target.value),
                          })
                        }
                        size="md"
                        type="number"
                        label="Product Prize"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            retailPrize: Number(e.target.value),
                          })
                        }
                        size="md"
                        type="number"
                        label="Retail Prize"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Select
                    label="Product Colors"
                    selectionMode="multiple"
                    className="max-w-xs"
                    onChange={(e) =>
                      setProduct({ ...product, color: [e.target.value] })
                    }
                  >
                    {colors.map((color) => (
                      <SelectItem key={color.key}>{color.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>
                          setProduct({ ...product, artical_no: e.target.value })
                        }
                        size="md"
                        type="text"
                        label="Artical No"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-name">Upload Images</Label>
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="product-images"
                        placeholder="Upload Image"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-black text-white"
              >
                Save
              </Button>
              <div className="grid grid-cols-5 gap-4">
                {product.images.map((image) => (
                  <Image
                    key={image}
                    alt="Leather Jacket"
                    className="rounded-lg object-cover w-full aspect-[3/4] group-hover:opacity-50 transition-opacity gap-y-3"
                    height={300}
                    src={image}
                    width={300}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
