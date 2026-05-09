"use client";
import { UserButton } from "@clerk/nextjs";
import { Show } from "@clerk/react";
import React from "react";

const File = () => {
  return (
    <div>
      <UserButton />
      Files
    </div>
  );
};

export default File;
