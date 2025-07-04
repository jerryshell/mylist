"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getUserFileList } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return;
      }
      const fileList = await getUserFileList({
        types: [],
        searchText: debouncedQuery,
      });
      setResults(fileList.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(`/${file.type}?query=${query}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center rounded-full px-4 py-2 shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="mx-2 w-full outline-hidden"
          placeholder="搜索"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="absolute top-16 left-0 z-50 flex w-full cursor-pointer flex-col gap-3 rounded-2xl bg-white p-4 shadow">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="truncate text-neutral-600">{file.name}</p>
                  </div>

                  <p className="truncate text-neutral-800">
                    {new Date(file.$createdAt).toLocaleString()}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-center text-neutral-600">找不到文件</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
