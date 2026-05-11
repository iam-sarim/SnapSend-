"use client";
import React, { useState, useRef } from "react";
import UploadForm from "./_components/UploadForm";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { generateRandomString } from "@/app/_utils/GenerateRandomString";
import { useRouter } from "next/navigation";
import { Toast } from "@/app/_components/Toast";
import { useToast } from "@/app/_utils/useToast";
import { getBaseUrl } from "@/app/_utils/GetBaseUrl";

const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const intervalRef = useRef(null);
  const { toasts, showToast } = useToast();

  const startProgressTick = (ceiling, durationMs = 3000) => {
    clearInterval(intervalRef.current);
    const steps = 40;
    const stepMs = durationMs / steps;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= ceiling) {
          clearInterval(intervalRef.current);
          return ceiling;
        }
        const remaining = ceiling - prev;
        const increment = Math.max(0.5, remaining / 10);
        return Math.min(prev + increment, ceiling);
      });
    }, stepMs);
  };

  const stopProgressAt = (value) => {
    clearInterval(intervalRef.current);
    setProgress(value);
  };

  const uploadFile = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const uniqueName = `${generateRandomString()}-${Date.now()}.${fileExt}`;
      const filePath = `file-upload/${uniqueName}`;

      setProgress(1);
      startProgressTick(65, 4000);

      const { data, error } = await supabase.storage
        .from("files")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        clearInterval(intervalRef.current);
        console.error("Upload error:", error);
        showToast("Upload failed: " + error.message, "error");
        setProgress(0);
        return;
      }

      stopProgressAt(65);
      startProgressTick(85, 1500);

      const {
        data: { publicUrl },
      } = supabase.storage.from("files").getPublicUrl(filePath);

      await saveInfo(file, publicUrl);
    } catch (err) {
      clearInterval(intervalRef.current);
      console.error("Unexpected error:", err);
      showToast("Something went wrong during upload.", "error");
      setProgress(0);
    }
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString();
    const baseUrl = getBaseUrl();

    const { error } = await supabase.from("uploadedFile").insert([
      {
        id: docId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName:
          user?.fullName || user?.primaryEmailAddress?.emailAddress || "User",
        password: "",
        shortUrl: `${baseUrl}/f/${docId}`,
      },
    ]);

    if (error) {
      clearInterval(intervalRef.current);
      console.error("DB insert error:", error);
      showToast("Failed to save file info: " + error.message, "error");
      setProgress(0);
      return;
    }

    stopProgressAt(85);
    startProgressTick(100, 600);

    setTimeout(() => {
      clearInterval(intervalRef.current);
      router.push("/file-preview/" + docId);
    }, 900);
  };

  return (
    <div className="p-5 px-8 md:px-28">
      <Toast toasts={toasts} />
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload a <span className="text-indigo-600">File</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Any file type · Up to 100MB · Instant shareable link
        </p>
      </div>
      <UploadForm
        uploadButtonClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
};

export default Upload;
