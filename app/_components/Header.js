"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="App logo"
            width={110}
            height={40}
            className="rounded-xl"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-indigo-600"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-indigo-600"
                  href="/upload"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-indigo-600"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              className="hidden sm:inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
              href="/upload"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="block rounded-md bg-gray-100 p-2.5 text-gray-600 transition hover:bg-gray-200 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                // X icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                href="/upload"
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                href="/about"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
