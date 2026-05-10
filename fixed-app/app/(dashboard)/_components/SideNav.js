"use client";
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideNav({ closeSideBar }) {
  const pathname = usePathname();

  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  return (
    <div className="shadow-sm border-r border-gray-200 h-full">
      <div className="p-5 border-b border-gray-200">
        <Image src="/logo.svg" width={150} height={100} alt="Logo" />
      </div>
      <div className="flex flex-col w-full">
        {menuList.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={closeSideBar}
              className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 transition ${
                isActive ? "bg-blue-50 text-yellow-600 font-medium" : ""
              }`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
