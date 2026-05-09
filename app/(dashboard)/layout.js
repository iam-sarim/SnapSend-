"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Desktop sidebar */}
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <SideNav />
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex transition-all duration-300 ${sidebarOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`relative w-64 h-full bg-white z-10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SideNav />
        </div>
      </div>

      <div className="md:ml-64">
        <TopHeader onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
