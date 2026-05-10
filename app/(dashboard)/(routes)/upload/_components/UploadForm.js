import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

function UploadForm({ uploadButtonClick, progress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 2000000) {
      setErrorMsg("Maximum file upload size is 2MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64
    bg-yellow-50 border-2 border-dashed border-amber-200 rounded-lg
    cursor-pointer transition-colors duration-100 hover:bg-[#fefbe0]"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 px-4 text-center">
            <svg
              className="w-12 h-12 mb-4 text-amber-400"
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

            <p className="mb-2 text-base sm:text-2xl">
              <span className="font-bold">Click to upload</span> or{" "}
              <span className="text-amber-400 font-bold">drag </span>
              and <span className="text-amber-400 font-bold">drop</span>
            </p>
            <p className="text-xs">SVG, PNG, JPG or GIF (Max Size: 2MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
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
          className="p-2 bg-amber-500 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-500 cursor-pointer"
          onClick={() => uploadButtonClick(file)}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default UploadForm;
