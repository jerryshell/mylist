"use client";

import { convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Thumbnail from "./Thumbnail";
import { uploadFile } from "@/lib/actions/file.actions";

const FileUploader = () => {
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const fileList = [];
    for (const file of e.target.files) {
      fileList.push(file);
    }

    setFileList(fileList);

    const uploadPromiseList = fileList.map(async (file) => {
      return uploadFile({ file }).then((uploadedFile) => {
        if (uploadedFile) {
          setFileList((prev) => prev.filter((f) => f.name !== file.name));
        }
      });
    });

    await Promise.all(uploadPromiseList);
  };

  const handleRemoveFile = (f: File) => {
    setFileList((prev) => prev.filter((file) => file !== f));
  };

  return (
    <>
      <label className="text-primary flex w-3xs cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-red-300 py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-semibold">上传文件</p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {fileList.length > 0 && (
        <ul className="fixed right-10 bottom-10 flex size-full h-fit w-sm flex-col gap-2 rounded-xl bg-white p-4 text-neutral-600 shadow">
          <div className="text-neutral-600">上传中...</div>
          {fileList.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="flex h-16 items-center justify-between gap-2 rounded-xl p-2 shadow"
              >
                <Thumbnail
                  type={type}
                  extension={extension}
                  url={convertFileToUrl(file)}
                />

                <div className="flex flex-1 flex-col gap-2 truncate text-sm font-semibold">
                  <p className="truncate">{file.name}</p>
                  <Image
                    src="/icons/file-loader.gif"
                    width={80}
                    height={26}
                    alt="Loader"
                  />
                </div>

                <button
                  onClick={() => handleRemoveFile(file)}
                  className="text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FileUploader;
