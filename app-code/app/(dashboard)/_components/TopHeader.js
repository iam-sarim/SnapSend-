import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopHeader({ onMenuClick }) {
  return (
    <div className="flex p-4 px-6 border-b border-gray-100 items-center justify-between md:justify-end bg-white shadow-sm">
      <button
        className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <AlignJustify className="size-5" />
      </button>
      <Image
        src="/logo.svg"
        width={120}
        height={80}
        alt="Logo"
        className="md:hidden"
      />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default TopHeader;
