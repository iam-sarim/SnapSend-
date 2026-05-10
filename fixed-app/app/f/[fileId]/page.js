"use client";
import { supabase } from "@/lib/supabase";
import React, { use, useEffect, useState } from "react";
import FileItem from "./_components/FileItem";
import Link from "next/link";
import Image from "next/image";

function FileView({ params }) {
  const { fileId } = use(params);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

    if (error || !data) {
      setNotFound(true);
    } else {
      setFile(data);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex justify-center items-center flex-col gap-4 p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="App logo" width={150} height={150} />
      </Link>

      {loading && (
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400" />
      )}

      {notFound && !loading && (
        <div className="text-center text-gray-500">
          <p className="text-lg">File not found or link is invalid.</p>
        </div>
      )}

      {!loading && !notFound && <FileItem file={file} />}
    </div>
  );
}

export default FileView;
