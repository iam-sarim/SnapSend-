import React, { useEffect, useState } from "react";
import Image from "next/image";

function FileInfo({ file }) {
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (file) {
      setFileType(file.fileType.split("/")[0]);
    }
  }, [file]);

  return (
    file && (
      <div className="text-center border flex justify-center m-4 flex-col items-center p-4 border-amber-300 rounded-md">
        <Image
          src={fileType === "image" ? file.fileUrl : "/file.png"}
          alt={fileType === "image" ? file.fileName || "file preview" : "file icon"}
          width={200}
          height={200}
          className="rounded-md object-contain h-[200px] w-auto"
          unoptimized={fileType === "image"}
        />
        <div className="mt-3">
          <h2 className="font-medium text-gray-700">{file.fileName}</h2>
          <h2 className="text-gray-400 text-[13px] mt-1">
            {file.fileType} · {(file.fileSize / 1024).toFixed(1)} KB
          </h2>
        </div>
      </div>
    )
  );
}

export default FileInfo;
