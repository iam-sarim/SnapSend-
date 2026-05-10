import { Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function FileItem({ file }) {
  const [password, setPassword] = useState("");
  return (
    file && (
      <div>
        <div className="p-5 rounded-md bg-white flex flex-col items-center">
          <div className="text-center flex-col gap-3 items-center flex">
            <h2 className="text-[20px] text-gray-600">
              <strong className="text-amber-300">{file.userName}</strong>share
              the file with you
            </h2>
            <h2 className="text-[10px] text-gray-400">
              Find file details below
            </h2>
            <Image
              src="download-file.gif"
              width={150}
              height={150}
              className="w-[150px] h-[150px] p-5"
              alt="logo"
            />
            <h2 className="text-gray-500 text-[15px]">
              {file.fileName}. {file.fileType}. {file.fileSize} Bytes
            </h2>
            <div />

            {file.password.length > 3 ? (
              <input
                type="password"
                className="p-2 border rounded-md text-[14px] mt-5 text-center outline-amber-400"
                placeholder="Enter Password to access"
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : null}

            <button
              href=""
              className="flex gap-2 p-2 bg-amber-300 text-white rounded-full w-full items-center hover:bg-amber-400 text-[14px] mt-5 text-center justify-center disabled:bg-gray-300"
              disabled={file.password !== password}
            >
              {" "}
              <Download className="h-4 w-4" />
              Download
            </button>
            <h2 className="text-gray-400 text-[12px]">Terms and Conditions</h2>
          </div>
        </div>
      </div>
    )
  );
}

export default FileItem;
