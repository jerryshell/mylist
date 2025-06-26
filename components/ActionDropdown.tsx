"use client";

import { deleteFile, renameFile } from "@/lib/actions/file.actions";
import { useRouter } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useRef, useState } from "react";

const LoadingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6 animate-spin"
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
      clipRule="evenodd"
    />
  </svg>
);

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openRename, setOpenRename] = useState(false);
  const [oldFileName, setOldFileName] = useState("");
  const [newFilename, setNewFileName] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      e.target &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const doRenameFile = async () => {
    await renameFile({
      fileId: file.$id,
      name: newFilename,
      extension: file.extension,
    });
  };

  const doDeleteFile = async () => {
    await deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="inline-flex items-center rounded-lg bg-gray-100 p-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:ring-4 focus:ring-gray-50 focus:outline-none"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
        {isOpen && (
          <div
            id="dropdownDots"
            className="absolute z-10 w-32 divide-y divide-gray-100 rounded-lg bg-white shadow-sm"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownMenuIconButton"
            >
              <li>
                <span
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setOldFileName(file.name);
                    setOpenRename(true);
                    setIsOpen(false);
                  }}
                >
                  重命名
                </span>
              </li>
              <li>
                <span
                  className="flex gap-1 px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={async () => {
                    setPending(true);
                    await doDeleteFile();
                    router.refresh();
                    setPending(false);
                  }}
                >
                  删除 {pending && <LoadingIcon />}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Rename */}
      {openRename && (
        <div
          className="absolute top-0 left-0 z-40 flex size-full cursor-default items-center justify-center"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex h-50 w-[400px] flex-col justify-center gap-2 rounded-2xl bg-white p-5 shadow-2xl">
            <p className="pt-4 text-xl font-bold">重命名</p>
            <p>原文件名：{oldFileName}</p>
            <input
              className="h-[44px] rounded border-2 border-red-300 p-2 shadow"
              placeholder="请输入新文件名"
              value={newFilename}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <div className="flex justify-around p-4">
              <button
                className="rounded bg-red-400 p-2 text-white shadow"
                onClick={() => {
                  setOpenRename(false);
                  setNewFileName("");
                }}
              >
                取消
              </button>
              <button
                className="flex gap-1 rounded bg-red-400 p-2 text-white shadow"
                onClick={async () => {
                  setPending(true);
                  await doRenameFile();
                  router.refresh();
                  setOpenRename(false);
                  setNewFileName("");
                  setPending(false);
                }}
                disabled={pending}
              >
                确定 {pending && <LoadingIcon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ActionDropdown;
