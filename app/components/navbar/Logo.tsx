"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/app/assets/images/logo.png";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      src={logo}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
    />
  );
};

export default Logo;
