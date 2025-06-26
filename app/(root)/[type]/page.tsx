import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { convertFileSize } from "@/lib/utils";

const Page = async ({
  searchParams,
  params,
}: {
  params?: Promise<{ type: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const type = (await params)?.type || "";

  const searchText = ((await searchParams)?.query as string) || "";

  const sort = ((await searchParams)?.sort as string) || "";

  const types = [type];

  const files = await getFiles({ types, searchText, sort });

  const sizeSum =
    files.documents.length > 0
      ? files.documents.map((doc) => doc.size).reduce((p, c) => p + c)
      : 0;

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-8 overflow-auto">
      <div className="w-full">
        <div className="mt-2 flex flex-col justify-between sm:flex-row sm:items-center">
          <p>
            总计：
            <span className="font-semibold">{convertFileSize(sizeSum)}</span>
          </p>

          <div className="flex items-center px-4">
            <p className="font-normal text-neutral-600">排序：</p>
            <Sort />
          </div>
        </div>
      </div>

      {files.total > 0 ? (
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

export default Page;
