import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

function UploadForm({ uploadButtonClick, progress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [dragging, setDragging] = useState(false);

  const onFileSelect = (file) => {
    if (file && file.size > MAX_SIZE) {
      setErrorMsg("Maximum file upload size is 100MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileSelect(dropped);
  };

  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center w-full"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64
            border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
            ${
              dragging
                ? "bg-indigo-50 border-indigo-400 scale-[1.01]"
                : "bg-gray-50 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300"
            }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            <div
              className={`size-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${dragging ? "bg-indigo-100" : "bg-indigo-50"}`}
            >
              <svg
                className="size-7 text-indigo-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>
            </div>

            <p className="mb-2 text-base sm:text-xl font-semibold text-gray-700">
              <span className="text-indigo-600">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-sm text-gray-400">
              Any file — image, video, audio, PDF, Word, etc.
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Max size: 100MB
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="*/*"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>

      {errorMsg ? <AlertMessage msg={errorMsg} /> : ""}

      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}

      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="inline-flex items-center gap-2 mt-5 px-8 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm
            transition hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
          onClick={() => uploadButtonClick(file)}
        >
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload File
        </button>
      )}
    </div>
  );
}

export default UploadForm;
