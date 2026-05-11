"use client";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { File, Link2, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toast } from "@/app/_components/Toast";
import { useToast } from "@/app/_utils/useToast";
import { formatFileSize } from "@/app/_utils/formatFileSize";

const FilesPage = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toasts, showToast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("uploadedFile")
      .select("*")
      .eq("userEmail", user?.primaryEmailAddress?.emailAddress)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  const deleteFile = async (fileId) => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("uploadedFile")
      .delete()
      .eq("id", fileId);

    if (error) {
      console.error("Error deleting file:", error);
      showToast("Failed to delete file.", "error");
    } else {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      showToast("File deleted successfully.", "success");
    }
  };

  return (
    <div className="p-5 px-8 md:px-16">
      <Toast toasts={toasts} />
      <h2 className="text-[20px] text-center m-5">
        Your <strong className="text-indigo-600">Uploaded</strong> Files
      </h2>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          <File className="mx-auto h-16 w-16 mb-4 text-gray-300" />
          <p className="text-lg">No files uploaded yet.</p>
          <Link
            href="/upload"
            className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-500 cursor-pointer"
          >
            Upload a File
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3 font-medium">File Name</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Size</th>
                <th className="p-3 font-medium">Password</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 flex items-center gap-2">
                    <File className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span className="truncate max-w-[180px]">
                      {file.fileName}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{file.fileType}</td>
                  <td className="p-3 text-gray-500">
                    {formatFileSize(file.fileSize)}
                  </td>
                  <td className="p-3">
                    {file.password ? (
                      <span className="text-green-500 text-xs font-medium">
                        Protected
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">None</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-3 items-center">
                      <Link
                        href={`/file-preview/${file.id}`}
                        className="text-indigo-600 hover:text-indigo-600 cursor-pointer"
                        title="View / Share"
                      >
                        <Link2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FilesPage;
