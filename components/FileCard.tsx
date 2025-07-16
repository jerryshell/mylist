import FileCardDeleteButton from "./FileCardDeleteButton";
import FileCardRenameButton from "./FileCardRenameButton";
import { getUserById } from "@/lib/actions/user.actions";
import { convertFileSize, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";

const FileCard = async ({ file }: { file: Models.Document }) => {
  const user = await getUserById(file.userId);

  const isImage = file.type === "image" && file.extension !== "svg";

  return (
    <div className="card bg-base-100 shadow-sm transition-all hover:shadow-xl">
      <figure>
        <Image
          className="mt-4"
          src={isImage ? file.url : getFileIcon(file.extension, file.type)}
          alt="thumbnail"
          width={100}
          height={100}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{file.name}</h2>
        <p>{convertFileSize(file.size)}</p>
        <p>{`${new Date(file.$createdAt).toLocaleString()}`}</p>
        <p>拥有者：{user.email}</p>
        <div className="card-actions justify-end">
          <a href={file.url} target="_blank" className="btn btn-primary">
            下载
          </a>
          <FileCardRenameButton file={file} />
          <FileCardDeleteButton file={file} />
        </div>
      </div>
    </div>
  );
};

export default FileCard;
