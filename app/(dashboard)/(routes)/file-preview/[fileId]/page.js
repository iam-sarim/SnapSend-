"use client";
import { supabase } from "@/lib/supabase";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";
import { Toast } from "@/app/_components/Toast";
import { useToast } from "@/app/_utils/useToast";

function FilePreview({ params }) {
  const { fileId } = use(params);
  const [file, setFile] = useState();
  const { toasts, showToast } = useToast();

  useEffect(() => {
    if (!fileId) return;
    getFileInfo();
  }, [fileId]);

  const getFileInfo = async () => {
    const { data, error } = await supabase
      .from("uploadedFile")
      .select("*")
      .eq("id", fileId)
      .single();

    if (error) {
      console.error("Error fetching file:", error);
      return;
    }
    setFile(data);
  };

  // Returns { success: true } or { error: "message" } so FileShareForm can show toast
  const onPasswordSave = async (password) => {
    const { error } = await supabase
      .from("uploadedFile")
      .update({ password })
      .eq("id", fileId);

    if (error) {
      console.error("Error saving password:", error);
      return { error: "Failed to save password." };
    }
    setFile((prev) => ({ ...prev, password }));
    return { success: true };
  };

  if (!file) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="py-10 px-6 md:px-20">
      <Toast toasts={toasts} />
      <Link
        href="/upload"
        className="flex gap-3 items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftSquare />
        Go to upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        <FileInfo file={file} />
        <FileShareForm
          file={file}
          onPasswordSave={onPasswordSave}
          showToast={showToast}
        />
      </div>
    </div>
  );
}

export default FilePreview;
