import React from "react";
import Link from "next/link";
import constant from "../_utils/Constant";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-indigo-50 grid min-h-[calc(100vh-64px)] place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-6">
            <span className="size-1.5 rounded-full bg-indigo-500 inline-block"></span>
            Fast · Secure · Simple
          </span> */}

          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
            <span className="text-indigo-600">Upload, Save</span> and easily{" "}
            <span className="text-indigo-600">Share</span> your files in one
            place
          </h1>

          <p className="mt-6 text-base text-gray-500 sm:text-lg leading-relaxed max-w-xl mx-auto">
            {constant.desc}
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-95"
              href="/upload"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Get Started
            </Link>

            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-indigo-200 hover:text-indigo-600"
              href="/about"
            >
              Learn More
            </Link>
          </div>

          {/* Trust indicators */}
          <p className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-2">
            <svg
              className="size-3.5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            No sign-up required to download &nbsp;·&nbsp; Up to 100MB per file
            &nbsp;·&nbsp; Secure sharing
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
