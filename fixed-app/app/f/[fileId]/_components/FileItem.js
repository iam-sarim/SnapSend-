"use client";
import { Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function FileItem({ file }) {
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const hasPassword = file?.password && file.password.length > 0;
  const isUnlocked = !hasPassword || file.password === password;

  const handleDownload = () => {
    if (!isUnlocked) {
      setWrongPassword(true);
      return;
    }
    // Open the file URL directly in a new tab to trigger download
    window.open(file.fileUrl, "_blank");
  };

  return (
    file && (
      <div>
        <div className="p-6 rounded-md bg-white flex flex-col items-center shadow-md min-w-[300px]">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-amber-400">{file.userName}</strong> shared
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
              {(file.fileSize / 1024).toFixed(1)} KB
            </h2>

            {hasPassword && (
              <div className="flex flex-col items-center gap-1 w-full">
                <input
                  type="password"
                  className="p-2 border rounded-md text-[14px] mt-3 text-center outline-amber-400 w-full"
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
              className="flex gap-2 p-2 bg-amber-300 text-white rounded-full w-full items-center hover:bg-amber-400 text-[14px] mt-3 text-center justify-center transition"
            >
              <Download className="h-4 w-4" />
              Download File
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
