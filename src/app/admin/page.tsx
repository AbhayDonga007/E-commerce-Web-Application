"use client"
import { AdminDashboard } from "@/components/AdminDashboard";
import { useSession, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Admin = () => {
  const {session,isLoaded} = useSession();
  const user = session?.user.publicMetadata;
  const router = useRouter();
  const role = user?.role;
  console.log(user);
  console.log(role);

  useEffect(() => {
    if (isLoaded && role !== "admin") {
      router.push("/sign-in");
    }
  }, [isLoaded, role, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }


  return (
    <AdminDashboard />
  );
};

export default Admin;
