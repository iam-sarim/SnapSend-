import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      {/* Left - Image (hidden on mobile/tablet) */}
      <div className="hidden lg:flex w-1/2">
        <Image
          src="/bg.png"
          alt="Login visual"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Right - Sign In Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-6 bg-white">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full max-w-lg",
              card: "w-full shadow-none border border-gray-200 rounded-2xl p-8",
              headerTitle: "text-2xl font-bold",
              formFieldInput: "h-11 text-base",
              formButtonPrimary: "h-11 text-base",
            },
          }}
        />
      </div>
    </div>
  );
}
