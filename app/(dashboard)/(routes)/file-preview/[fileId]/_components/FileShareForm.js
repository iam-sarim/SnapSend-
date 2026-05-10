import GlobalApi from "@/app/_utils/GlobalApi";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

const FileShareForm = ({ file, onPasswordSave }) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [toast, setToast] = useState("");
  const { user } = useUser();

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data).then((res) => {
      setToast({
        status: "success",
        msg: "Email sent Successfully!",
      });
    });
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl);
    setToast({
      status: "copied",
      msg: "Url Copied!",
    });
  };
  return (
    file && (
      <div className="flex flex-col gap-2">
        <div>
          <label className="text=[14px] text-gray-400">Short Url</label>
          <div className="flex gap-5 p-2 border rounded-md justify-between">
            <input
              type="text"
              value={file.shortUrl}
              disabled
              className="disable:text-gray-400 bg-transparent outline-none w-full"
            />
            <Copy
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => onCopyClick()}
            />
          </div>
          <div className="gap-3 flex mt-5">
            <input type="checkbox" onChange={(e) => setIsPasswordEnabled()} />
            <label>Enable Password?</label>
          </div>

          {isPasswordEnabled ? (
            <div className="flex gap-3 items-center">
              <div className="border rounded-md w-full p-2">
                <input
                  type="password"
                  defaultValue={file.password}
                  className="disabled:text-gray-500 bg-transparent outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="p-2 bg-amber-300 hover:bg-amber-200 text-white rounded-md disabled:bg-gray-300"
                disabled={password?.length}
                onClick={() => onPasswordSave(password)}
              >
                Save
              </button>
            </div>
          ) : null}

          <div className="border rounded-md p-3 mt-5">
            <label className="text-[14px] text-gray-500">
              Send File to email
            </label>
            <div className="border rounded-md p-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="bg-transparent outline-none"
              />
            </div>
            <button
              className="p-2 disabled:bg-gray-300 bg-amber-300 text-white hover:bg-amber-400 w-full mt-2 rounded-md"
              onClick={() => sendEmail()}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FileShareForm;
