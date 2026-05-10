"use client";
import { app } from "@/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { use, useEffect, useState } from "react";
import FileItem from "./_components/fileItem";
import Link from "next/link";
import Image from "next/image";

function FileView({ params }) {
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
  }, [fileId]);

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      <Link href="">
        <Image src="/logo.svg" alt="App logo" width={150} height={150} />
      </Link>
      <FileItem file={file} />
    </div>
  );
}

export default FileView;
