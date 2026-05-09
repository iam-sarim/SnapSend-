import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopHeader({ onMenuClick }) {
  return (
    <div className="flex p-5 border-b border-gray-200 item-center justify-between md:justify-end">
      <AlignJustify
        className="md:hidden cursor-pointer"
        onClick={onMenuClick}
      />
      <Image
        src="/logo.svg"
        width={150}
        height={100}
        alt="Logo"
        className="md:hidden"
      />
      <UserButton />
    </div>
  );
}

export default TopHeader;
