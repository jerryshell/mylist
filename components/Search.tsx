"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getUserFileList } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState("");
  const [userFileList, setUserFileList] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [debouncedQuery] = useDebounce(query, 300);

  const fetchFileList = async (query: string) => {
    if (query.length === 0) {
      setUserFileList([]);
      setOpen(false);
      return;
    }
    const userFileList = await getUserFileList({
      types: [],
      searchText: query,
    });
    setUserFileList(userFileList.documents);
    setOpen(true);
  };

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchFileList(debouncedQuery);
  }, [debouncedQuery]);

  const handleItemClick = (file: Models.Document) => {
    setOpen(false);
    setUserFileList([]);
    router.push(`/${file.type}?query=${query}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center rounded-full px-4 py-2 shadow">
        <SearchIcon />
        <input
          className="mx-2 w-full outline-hidden"
          placeholder="搜索"
          onChange={(e) => setQuery(e.target.value)}
        />
        {open && (
          <div className="absolute top-16 left-0 z-50 flex w-full justify-center">
            <ul className="flex w-2/3 cursor-pointer flex-col gap-3 rounded-2xl bg-white p-4 shadow">
              {userFileList.length > 0 ? (
                userFileList.map((userFile) => (
                  <li
                    className="flex items-center justify-between rounded p-1 hover:bg-neutral-100"
                    key={userFile.$id}
                    onClick={() => handleItemClick(userFile)}
                  >
                    <div className="flex items-center gap-4">
                      <Thumbnail
                        type={userFile.type}
                        extension={userFile.extension}
                        url={userFile.url}
                        className="size-9 min-w-9"
                      />
                      <p className="truncate">{userFile.name}</p>
                    </div>
                    <p className="truncate text-neutral-400">
                      {new Date(userFile.$createdAt).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-center text-neutral-600">找不到文件</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchIcon = () => (
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
);

export default Search;
