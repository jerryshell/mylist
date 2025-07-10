import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import { getUserById } from "@/lib/actions/user.actions";
import ActionDropdown from "./ActionDropdown";

const FileCard = async ({ file }: { file: Models.Document }) => {
  const user = await getUserById(file.userId);

  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-10"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-neutral-600">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-neutral-800">
        <p className="truncate font-bold">{file.name}</p>
        <p className="truncate text-sm text-neutral-600">{`${new Date(file.$createdAt).toLocaleString()}`}</p>
        <p className="truncate text-sm text-neutral-600">
          拥有者：{user.email}
        </p>
      </div>
    </Link>
  );
};

export default FileCard;
