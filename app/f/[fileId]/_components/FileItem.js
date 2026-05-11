"use client";
import { Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { formatFileSize } from "@/app/_utils/formatFileSize";

function FileItem({ file }) {
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const hasPassword = file?.password && file.password.length > 0;
  const isUnlocked = !hasPassword || file.password === password;

  // Derive a display name from whatever the uploader stored
  const displayName =
    file?.userName && file.userName.trim().length > 0
      ? file.userName
      : file?.userEmail
        ? file.userEmail.split("@")[0]
        : "Someone";

  const handleDownload = async () => {
    if (!isUnlocked) {
      setWrongPassword(true);
      return;
    }

    setDownloading(true);
    try {
      // Fetch the file as a blob so it downloads directly — no new tab opened
      const response = await fetch(file.fileUrl);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = file.fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
      // Fallback: open in new tab if blob download fails (e.g. CORS)
      window.open(file.fileUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    file && (
      <div>
        <div className="p-6 rounded-md bg-white flex flex-col items-center shadow-md min-w-[300px]">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-indigo-600">{displayName}</strong> shared
              a file with you
            </h2>
            <h2 className="text-[10px] text-gray-400">
              Find file details below
            </h2>
            <Image
              src="/download-file.gif"
              width={150}
              height={150}
              className="w-[150px] h-[150px] p-5"
              alt="download"
              unoptimized
            />
            <h2 className="text-gray-500 text-[15px]">
              {file.fileName} &nbsp;·&nbsp; {file.fileType} &nbsp;·&nbsp;{" "}
              {formatFileSize(file.fileSize)}
            </h2>

            {hasPassword && (
              <div className="flex flex-col items-center gap-1 w-full">
                <input
                  type="password"
                  className="p-2 border rounded-md text-[14px] mt-3 text-center outline-indigo-400 w-full"
                  placeholder="Enter password to access"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setWrongPassword(false);
                  }}
                />
                {wrongPassword && (
                  <p className="text-red-500 text-[12px]">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex gap-2 p-2 bg-indigo-600 text-white rounded-full w-full items-center hover:bg-indigo-500
                text-[14px] mt-3 text-center justify-center transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Downloading…" : "Download File"}
            </button>
            <h2 className="text-gray-400 text-[12px] mt-1">
              Terms and Conditions
            </h2>
          </div>
        </div>
      </div>
    )
  );
}

export default FileItem;
