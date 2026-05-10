import GlobalApi from "@/app/_utils/GlobalApi";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

const FileShareForm = ({ file, onPasswordSave }) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");
  const { user } = useUser();

  const showToast = (status, msg) => {
    setToast({ status, msg });
    setTimeout(() => setToast(""), 3000);
  };

  const sendEmail = () => {
    if (!email) {
      showToast("error", "Please enter an email address");
      return;
    }
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data)
      .then(() => {
        showToast("success", "Email sent successfully!");
        setEmail("");
      })
      .catch(() => {
        showToast("error", "Failed to send email. Please try again.");
      });
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl);
    showToast("copied", "URL Copied!");
  };

  return (
    file && (
      <div className="flex flex-col gap-3 border border-gray-200 rounded-md p-5">
        {/* Short URL */}
        <div>
          <label className="text-[14px] text-gray-400">Share Link</label>
          <div className="flex gap-3 p-2 border rounded-md justify-between items-center mt-1">
            <input
              type="text"
              value={file.shortUrl}
              disabled
              className="text-gray-500 bg-transparent outline-none w-full text-sm"
            />
            <Copy
              className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
              onClick={onCopyClick}
            />
          </div>
        </div>

        {/* Password Toggle */}
        <div className="flex gap-3 items-center mt-2">
          <input
            type="checkbox"
            id="enablePassword"
            checked={isPasswordEnabled}
            onChange={(e) => setIsPasswordEnabled(e.target.checked)}
          />
          <label htmlFor="enablePassword" className="cursor-pointer text-sm text-gray-600">
            Enable Password Protection
          </label>
        </div>

        {/* Password Input */}
        {isPasswordEnabled && (
          <div className="flex gap-3 items-center">
            <div className="border rounded-md w-full p-2">
              <input
                type="password"
                placeholder="Enter a password"
                defaultValue={file.password}
                className="bg-transparent outline-none w-full text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="p-2 bg-amber-300 hover:bg-amber-400 text-white rounded-md disabled:bg-gray-300 text-sm whitespace-nowrap"
              disabled={!password?.length}
              onClick={() => onPasswordSave(password)}
            >
              Save
            </button>
          </div>
        )}

        {/* Send Email */}
        <div className="border rounded-md p-3 mt-2">
          <label className="text-[14px] text-gray-500 font-medium">
            Send File via Email
          </label>
          <div className="border rounded-md p-2 mt-2">
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              className="bg-transparent outline-none w-full text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-amber-300 text-white hover:bg-amber-400 w-full mt-2 rounded-md text-sm disabled:bg-gray-300"
            disabled={!email}
            onClick={sendEmail}
          >
            Send Email
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`p-3 rounded-md text-white text-sm text-center ${
              toast.status === "error" ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {toast.msg}
          </div>
        )}
      </div>
    )
  );
};

export default FileShareForm;
