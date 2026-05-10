"use client";
import { app } from "@/firebaseConfig";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ArrowLeftSquare } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileShareForm from "./_components/FileShareForm";

function FilePreview({ params }) {
  const { fileId } = use(params);
  const db = getFirestore(app);
  const [file, setFile] = useState();

  useEffect(() => {
    if (!fileId) return;

    const getFileInfo = async () => {
      try {
        const docRef = doc(db, "uploadedFile", fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("document data:", docSnap.data());
          setFile(docSnap.data());
        } else {
          console.log("no such document");
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    getFileInfo();
    const onPasswordSave = async (password) => {
      const docRef = doc(db, "uploadedFile", params?.fileId);
      await updateDoc(docRef, {
        password: password,
      });
    };
  }, [fileId]);

  return (
    <div className="py-10 px-20">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare />
        Go to upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        <FileInfo file={file} />
        <FileShareForm file={file} />
        onPasswordSave={(password) => onPasswordSave(password)}
      </div>
    </div>
  );
}

export default FilePreview;
