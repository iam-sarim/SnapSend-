"use client";
import { supabase } from "@/lib/supabase";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";

function FilePreview({ params }) {
  const { fileId } = use(params);
  const [file, setFile] = useState();

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

  const onPasswordSave = async (password) => {
    const { error } = await supabase
      .from("uploadedFile")
      .update({ password })
      .eq("id", fileId);

    if (error) {
      console.error("Error saving password:", error);
      alert("Failed to save password.");
    } else {
      // Update local state too
      setFile((prev) => ({ ...prev, password }));
      alert("Password saved successfully!");
    }
  };

  return (
    <div className="py-10 px-6 md:px-20">
      <Link href="/upload" className="flex gap-3 items-center text-gray-600 hover:text-gray-900">
        <ArrowLeftSquare />
        Go to upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        <FileInfo file={file} />
        <FileShareForm
          file={file}
          onPasswordSave={(password) => onPasswordSave(password)}
        />
      </div>
    </div>
  );
}

export default FilePreview;
