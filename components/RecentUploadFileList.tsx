import { Models } from "node-appwrite";
import Card from "./Card";
import { getFiles } from "@/lib/actions/file.actions";
import { redirect } from "next/navigation";

const RecentUploadFileList = async () => {
  const fileList = await getFiles({ types: [], limit: 16 }).catch(() =>
    redirect("/login"),
  );

  return (
    <div className="h-full overflow-auto rounded-[20px] bg-white p-8">
      <p className="mb-2 text-2xl text-neutral-800">最近上传的文件</p>
      {fileList.documents.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {fileList.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-neutral-600">没有上传文件</p>
      )}
    </div>
  );
};

export default RecentUploadFileList;
