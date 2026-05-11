import React from "react";
import Image from "next/image";
import { formatFileSize } from "@/app/_utils/formatFileSize";

// SVG icons for different file types
function VideoIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] h-[140px]"
    >
      <rect width="80" height="80" rx="16" fill="#EEF2FF" />
      <rect x="10" y="20" width="45" height="40" rx="6" fill="#6366F1" />
      <polygon points="32,30 32,50 55,40" fill="white" />
      <rect x="58" y="24" width="4" height="12" rx="2" fill="#4F46E5" />
      <rect x="64" y="28" width="4" height="12" rx="2" fill="#4F46E5" />
      <rect x="58" y="44" width="4" height="12" rx="2" fill="#4F46E5" />
      <rect x="64" y="44" width="4" height="12" rx="2" fill="#4F46E5" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] h-[140px]"
    >
      <rect width="80" height="80" rx="16" fill="#F0FDF4" />
      <circle cx="40" cy="40" r="22" fill="#22C55E" />
      <circle cx="40" cy="40" r="8" fill="white" />
      <circle cx="40" cy="40" r="3" fill="#22C55E" />
      <rect x="38" y="12" width="4" height="8" rx="2" fill="#22C55E" />
      <rect x="38" y="60" width="4" height="8" rx="2" fill="#22C55E" />
      <rect x="12" y="38" width="8" height="4" rx="2" fill="#22C55E" />
      <rect x="60" y="38" width="8" height="4" rx="2" fill="#22C55E" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] h-[140px]"
    >
      <rect width="80" height="80" rx="16" fill="#FEF2F2" />
      <rect x="16" y="10" width="36" height="46" rx="4" fill="#EF4444" />
      <rect x="52" y="10" width="12" height="12" rx="2" fill="#FCA5A5" />
      <path d="M52 10 L64 22 L52 22 Z" fill="#DC2626" />
      <rect x="22" y="32" width="24" height="3" rx="1.5" fill="white" />
      <rect x="22" y="39" width="24" height="3" rx="1.5" fill="white" />
      <rect x="22" y="46" width="16" height="3" rx="1.5" fill="white" />
      <rect x="10" y="48" width="28" height="18" rx="4" fill="#DC2626" />
      <text
        x="24"
        y="61"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Arial"
      >
        PDF
      </text>
    </svg>
  );
}

function ZipIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] h-[140px]"
    >
      <rect width="80" height="80" rx="16" fill="#FFFBEB" />
      <rect x="16" y="10" width="48" height="56" rx="4" fill="#F59E0B" />
      <rect x="32" y="10" width="16" height="56" rx="0" fill="#FCD34D" />
      <rect x="32" y="10" width="16" height="8" rx="2" fill="#D97706" />
      <rect x="32" y="22" width="16" height="8" rx="2" fill="#D97706" />
      <rect x="32" y="34" width="16" height="8" rx="2" fill="#D97706" />
      <rect x="32" y="46" width="16" height="8" rx="2" fill="#D97706" />
      <circle cx="40" cy="58" r="4" fill="#92400E" />
    </svg>
  );
}

function GenericFileIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[140px] h-[140px]"
    >
      <rect width="80" height="80" rx="16" fill="#F8FAFC" />
      <rect x="16" y="10" width="36" height="48" rx="4" fill="#94A3B8" />
      <rect x="52" y="10" width="12" height="12" rx="2" fill="#CBD5E1" />
      <path d="M52 10 L64 22 L52 22 Z" fill="#64748B" />
      <rect x="22" y="30" width="24" height="3" rx="1.5" fill="white" />
      <rect x="22" y="37" width="24" height="3" rx="1.5" fill="white" />
      <rect x="22" y="44" width="16" height="3" rx="1.5" fill="white" />
    </svg>
  );
}

function renderFilePreview(file) {
  const type = file.fileType?.split("/")[0] || "";
  const subtype = file.fileType?.split("/")[1] || "";

  if (type === "image") {
    return (
      <Image
        src={file.fileUrl}
        alt={file.fileName || "file preview"}
        width={200}
        height={200}
        className="rounded-md object-contain h-[200px] w-auto"
        unoptimized
      />
    );
  }
  if (type === "video") return <VideoIcon />;
  if (type === "audio") return <AudioIcon />;
  if (subtype === "pdf") return <PdfIcon />;
  if (
    subtype === "zip" ||
    subtype === "x-zip-compressed" ||
    subtype === "x-rar-compressed" ||
    subtype === "x-7z-compressed"
  )
    return <ZipIcon />;
  return <GenericFileIcon />;
}

function FileInfo({ file }) {
  if (!file) return null;

  return (
    <div className="text-center border flex justify-center m-4 flex-col items-center p-4 border-indigo-300 rounded-md">
      <div className="flex items-center justify-center h-[200px] w-full">
        {renderFilePreview(file)}
      </div>
      <div className="mt-3">
        <h2 className="font-medium text-gray-700">{file.fileName}</h2>
        <h2 className="text-gray-400 text-[13px] mt-1">
          {file.fileType} · {formatFileSize(file.fileSize)}
        </h2>
      </div>
    </div>
  );
}

export default FileInfo;
