import React from "react";

function ProgressBar({ progress = 0 }) {
  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-500">Uploading…</span>
        <span className="text-xs font-semibold text-indigo-600">{`${Number(progress).toFixed(0)}%`}</span>
      </div>
      <div className="bg-gray-100 w-full h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 0.4s ease-in-out",
          }}
        />
      </div>
      {progress === 100 && (
        <p className="text-xs text-green-600 font-medium mt-2 text-center">
          ✓ Upload complete — redirecting…
        </p>
      )}
    </div>
  );
}

export default ProgressBar;
