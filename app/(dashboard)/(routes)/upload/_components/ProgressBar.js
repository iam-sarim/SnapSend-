import React from "react";

function ProgressBar({ progress = 40 }) {
  return (
    <div className="bg-gray-400 w-full ht-4 mt-3 rounded-full">
      <div
        className="bg-yellow-400 h-4 rounded-full text-[10px] text-white"
        style={{
          width: `${progress}%`,
        }}
      >{`${Number(progress).toFixed(0)}%`}</div>
    </div>
  );
}

export default ProgressBar;
