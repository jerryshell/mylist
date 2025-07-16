import FileCard from "./FileCard";
import { getUserFileList } from "@/lib/actions/file.actions";
import { redirect } from "next/navigation";
import { Models } from "node-appwrite";

const RecentUploadFileList = async () => {
  const fileList = await getUserFileList({ types: [], limit: 30 }).catch(() =>
    redirect("/login"),
  );

  return (
    <div className="h-full overflow-auto rounded-[20px] bg-white p-8">
      <p className="mb-2 text-2xl text-neutral-800">最近上传的文件</p>
      {fileList.documents.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {fileList.documents.map((file: Models.Document) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-neutral-600">没有上传文件</p>
      )}
    </div>
  );
};

export default RecentUploadFileList;
