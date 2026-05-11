import GlobalApi from "@/app/_utils/GlobalApi";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

const FileShareForm = ({ file, onPasswordSave, showToast }) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const { user } = useUser();

  const sendEmail = async () => {
    if (!email) {
      showToast("Please enter an email address.", "error");
      return;
    }
    setSending(true);
    const data = {
      emailToSend: email,
      userName:
        user?.fullName || user?.primaryEmailAddress?.emailAddress || "Someone",
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    try {
      await GlobalApi.SendEmail(data);
      showToast("Email sent successfully!", "success");
      setEmail("");
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to send email. Please try again.";
      showToast(msg, "error");
    } finally {
      setSending(false);
    }
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl);
    showToast("Link copied to clipboard!", "copied");
  };

  const handlePasswordSave = async () => {
    const result = await onPasswordSave(password);
    if (result?.success) {
      showToast("Password saved successfully!", "success");
    } else {
      showToast(result?.error || "Failed to save password.", "error");
    }
  };

  return (
    file && (
      <div className="flex flex-col gap-3 border border-indigo-300 rounded-md p-5">
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
            className="cursor-pointer"
          />
          <label
            htmlFor="enablePassword"
            className="cursor-pointer text-sm text-gray-600"
          >
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
              className="p-2 bg-indigo-300 hover:bg-indigo-400 text-white rounded-md disabled:bg-gray-300 text-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed transition"
              disabled={!password?.length}
              onClick={handlePasswordSave}
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
            className="p-2 bg-indigo-300 text-white hover:bg-indigo-400 w-full mt-2 rounded-md text-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed transition"
            disabled={!email || sending}
            onClick={sendEmail}
          >
            {sending ? "Sending…" : "Send Email"}
          </button>
        </div>
      </div>
    )
  );
};

export default FileShareForm;
