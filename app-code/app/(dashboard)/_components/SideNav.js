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
    <div className="bg-white shadow-sm border-r border-gray-100 h-full flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <Image src="/logo.svg" width={150} height={100} alt="Logo" />
      </div>
      <nav className="flex flex-col w-full flex-1 py-3">
        {menuList.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={closeSideBar}
              className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              <item.icon
                className={`size-4.5 shrink-0 ${isActive ? "text-indigo-600" : "text-gray-400"}`}
              />
              <span>{item.name}</span>
              {isActive && (
                <span className="ml-auto size-1.5 rounded-full bg-indigo-600" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SideNav;
