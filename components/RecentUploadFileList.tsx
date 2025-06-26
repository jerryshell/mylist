import { Models } from "node-appwrite";
import Card from "./Card";

const RecentUploadFileList = ({
  files,
}: {
  files: Models.DocumentList<Models.Document>;
}) => {
  return (
    <div className="h-full overflow-auto rounded-[20px] bg-white p-8">
      <h2 className="text-2xl text-neutral-800">最近上传的文件</h2>
      {files.documents.length > 0 ? (
        <div className="grid w-full grid-cols-4 gap-6">
          {files.documents.map((file: Models.Document) => (
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
