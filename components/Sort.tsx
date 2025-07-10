"use client";

import { usePathname, useRouter } from "next/navigation";

const sortTypes = [
  {
    label: "创建日期（最新）",
    value: "$createdAt-desc",
  },
  {
    label: "创建日期（最旧）",
    value: "$createdAt-asc",
  },
  {
    label: "名字（A-Z）",
    value: "name-asc",
  },
  {
    label: "名字（Z-A）",
    value: "name-desc",
  },
  {
    label: "大小（最大）",
    value: "size-desc",
  },
  {
    label: "大小（最小）",
    value: "size-asc",
  },
];

const Sort = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <select
      className="focus:border-primary focus:ring-primary rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900"
      defaultValue={sortTypes[0].value}
      onChange={(e) => handleSort(e.target.value)}
    >
      {sortTypes.map((sort) => (
        <option
          key={sort.label}
          className="shad-select-item"
          value={sort.value}
        >
          {sort.label}
        </option>
      ))}
    </select>
  );
};

export default Sort;
