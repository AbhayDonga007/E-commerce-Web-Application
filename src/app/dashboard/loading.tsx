// import { Card, Navbar, NavbarContent, NavbarItem, Skeleton } from "@nextui-org/react";
import { Card, Navbar, NavbarContent, NavbarItem, Skeleton } from "@heroui/react";
import React, { FunctionComponent } from "react";

type Props = {};

const loading: FunctionComponent = () => {
  return (
    <div>
      <Navbar isBordered>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavbarContent justify="start">
            <Skeleton className="rounded-lg w-[130px] h-[30px]" />
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-5">
            <NavbarItem>
              <Skeleton className="rounded-lg w-[80px] h-[30px]" />
            </NavbarItem>
            <NavbarItem>
              <Skeleton className="rounded-lg w-[80px] h-[30px]" />
            </NavbarItem>
            <NavbarItem>
              <Skeleton className="rounded-lg w-[80px] h-[30px]" />
            </NavbarItem>

            <NavbarItem>
              <Skeleton className="rounded-lg w-[80px] h-[30px]" />
            </NavbarItem>

            <NavbarItem>
              <Skeleton className="rounded-lg w-[80px] h-[30px]" />
            </NavbarItem>
          </NavbarContent>
        </nav>
        <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        <div className="w-[60px] md:hidden"></div>
        <NavbarContent justify="end">
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Skeleton className="rounded-lg w-[30px] h-[30px]" />
            <Skeleton className="rounded-lg w-[30px] h-[30px]" />
          </div>
        </NavbarContent>
      </Navbar>

      {/* Categorys */}
      <section className="w-full py-6">
        <div className="container grid gap-8 md:gap-12 px-4 md:px-6">
          <div className="md:items-center pl-[30%] pr-[30%] gap-4 md:gap-8">
            <div className="grid gap-1 ">
              <Skeleton className="rounded-lg w-auto h-[35px]" />
              <Skeleton className="rounded-lg w-auto h-[30px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 xl:pl-[150px] xl:pr-[150px] md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5  relative group">
                <Skeleton className="rounded-lg w-[180px] h-[180px]" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* catagory Products */}
      <section className="w-full py-6">
        <div className="container grid gap-8 md:gap-12 px-4 md:px-6">
          <div className="md:items-center pl-[30%] pr-[30%] gap-4 md:gap-8">
            <div className="grid gap-1 ">
              <Skeleton className="rounded-lg w-auto h-[35px]" />
              <Skeleton className="rounded-lg w-auto h-[30px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:pl-20 xl:pr-20 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-6">
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
          </div>
        </div>
      </section>

      <section className="w-full py-6">
        <div className="container grid gap-8 md:gap-12 px-4 md:px-6">
          <div className="md:items-center pl-[30%] pr-[30%] gap-4 md:gap-8">
            <div className="grid gap-1 ">
              <Skeleton className="rounded-lg w-auto h-[35px]" />
              <Skeleton className="rounded-lg w-auto h-[30px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:pl-20 xl:pr-20 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-6">
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
            <Skeleton className="rounded-lg w-[230px] h-[330px]" />
          </div>
        </div>
      </section>

      {/* Qulitity Product */}
      <div className="mr-[10%] ml-[10%] mt-[2%] mb-[2%] gap-4 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5">
        <Card className="items-center p-2 gap-2" shadow="md">
          <Skeleton className="rounded-lg w-[175px] h-[175px]" />
          <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        </Card>
        <Card className="items-center p-2 gap-2" shadow="md">
          <Skeleton className="rounded-lg w-[175px] h-[175px]" />
          <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        </Card>
        <Card className="items-center p-2 gap-2" shadow="md">
          <Skeleton className="rounded-lg w-[175px] h-[175px]" />
          <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        </Card>
        <Card className="items-center p-2 gap-2" shadow="md">
          <Skeleton className="rounded-lg w-[175px] h-[175px]" />
          <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        </Card>
        <Card className="items-center p-2 gap-2" shadow="md">
          <Skeleton className="rounded-lg w-[175px] h-[175px]" />
          <Skeleton className="rounded-lg w-[130px] h-[30px]" />
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6 mt-8 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Skeleton className="rounded-lg w-[130px] h-[30px]" />
            <Skeleton className="rounded-lg w-[300px] h-[120px]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Skeleton className="rounded-lg w-[130px] h-[30px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="rounded-lg w-[130px] h-[30px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="rounded-lg w-[130px] h-[30px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Skeleton className="rounded-lg w-[130px] h-[30px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="rounded-lg w-[300px] h-[120px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <Skeleton className="rounded-lg w-[80px] h-[20px]" />
              <div className="flex flex-row gap-3">
                <Skeleton className="rounded-lg w-[30px] h-[30px]" />
                <Skeleton className="rounded-lg w-[30px] h-[30px]" />
                <Skeleton className="rounded-lg w-[30px] h-[30px]" />
                <Skeleton className="rounded-lg w-[30px] h-[30px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-8 mb-0 pb-0 border-t pt-4 flex items-center justify-between">
          <Skeleton className="rounded-lg w-[250px] h-[20px]" />
          <nav className="flex items-center gap-4">
            <Skeleton className="rounded-lg w-[200px] h-[20px]" />
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default loading;
