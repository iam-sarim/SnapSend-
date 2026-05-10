"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "@/app/_utils/GenerateRandomString";
import { useRouter } from "next/navigation";

const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const uploadFile = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const uniqueName = `${generateRandomString()}-${Date.now()}.${fileExt}`;
      const filePath = `file-upload/${uniqueName}`;

      setProgress(20);

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("files")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        alert("Upload failed: " + error.message);
        setProgress(0);
        return;
      }

      setProgress(70);

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("files").getPublicUrl(filePath);

      await saveInfo(file, publicUrl);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong during upload.");
      setProgress(0);
    }
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();

    const { error } = await supabase.from("uploadedFile").insert([
      {
        id: docId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        password: "",
        shortUrl:
          process.env.NEXT_PUBLIC_BASE_URL + "/f/" + docId,
      },
    ]);

    if (error) {
      console.error("DB insert error:", error);
      alert("Failed to save file info: " + error.message);
      setProgress(0);
      return;
    }

    setProgress(100);

    // Redirect to file preview page after short delay
    setTimeout(() => {
      router.push("/file-preview/" + docId);
    }, 500);
  };

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-yellow-500">Uploading</strong> File and
        <strong className="text-yellow-500"> Share </strong>
        it
      </h2>
      <UploadForm
        uploadButtonClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
};

export default Upload;
