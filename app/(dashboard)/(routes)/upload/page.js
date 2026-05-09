"use client";
import React from "react";
import UploadForm from "./_components/UploadForm";
import { getStorage } from "firebase/storage";

const Upload = ({ uploadButtonClick }) => {
  const storage = getStorage(app);
  const uploadFile = (file) => {
    const imageRef = ref(storage, "file-upload/" + file?.name);
  };
  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-yellow-500">Uploading</strong> File and
        <strong className="text-yellow-500"> Share </strong>
        it
      </h2>
      <UploadForm uploadButtonClick={(file) => uploadFile(file)} />
    </div>
  );
};

export default Upload;
