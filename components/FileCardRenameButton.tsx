"use client";

import { Models } from "node-appwrite";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { renameFile } from "@/lib/actions/file.actions";

const FileCardRenameButton = ({ file }: { file: Models.Document }) => {
  const router = useRouter();
  const [newFilename, setNewFileName] = useState("");
  const [pending, setPending] = useState(false);
  const renameModal = useRef<HTMLDialogElement>(null);

  const doRenameFile = async () => {
    await renameFile({
      fileId: file.$id,
      name: newFilename,
      extension: file.extension,
    });
  };

  return (
    <div>
      <button
        className="btn btn-info"
        onClick={() => {
          renameModal.current?.showModal();
        }}
      >
        重命名
      </button>
      <dialog id="rename-modal" ref={renameModal} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">重命名</h3>
          <p className="py-4">原文件名：{file.name}</p>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </g>
            </svg>
            <input
              type="text"
              disabled={pending}
              className="grow"
              placeholder="请输入文件名"
              value={newFilename}
              onChange={(e) => setNewFileName(e.target.value)}
            />
          </label>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              <button disabled={pending} className="btn btn-dash">
                关闭
              </button>
              <button
                onClick={async () => {
                  setPending(true);
                  await doRenameFile();
                  router.refresh();
                  setNewFileName("");
                  setPending(false);
                  renameModal.current?.close();
                }}
                disabled={pending}
                className="btn btn-primary"
              >
                {pending ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "提交"
                )}
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FileCardRenameButton;
