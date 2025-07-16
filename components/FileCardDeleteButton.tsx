"use client";

import { Models } from "node-appwrite";
import { deleteFile } from "@/lib/actions/file.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FileCardDeleteButton = ({ file }: { file: Models.Document }) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const doDeleteFile = async () => {
    await deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId });
  };

  return (
    <button
      className="btn btn-warning"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await doDeleteFile();
        router.refresh();
        setPending(false);
      }}
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        "删除"
      )}
    </button>
  );
};

export default FileCardDeleteButton;
