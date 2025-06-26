import { convertFileSize } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const DashboardFileSummary = ({
  usageSummary,
}: {
  usageSummary: {
    title: string;
    size: number;
    latestDate: string;
    icon: string;
    url: string;
  }[];
}) => {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 xl:mt-10">
      {usageSummary.map((summary) => (
        <Link
          href={summary.url}
          key={summary.title}
          className="relative mt-6 rounded-[20px] bg-white p-5 transition-all hover:scale-105"
        >
          <div className="space-y-4">
            <div className="flex justify-between gap-3">
              <Image
                src={summary.icon}
                width={100}
                height={100}
                alt="uploaded image"
                className="absolute top-[-25px] -left-3 z-10 w-[190px] object-contain"
              />
              <h4 className="relative z-20 w-full text-right">
                {convertFileSize(summary.size) || 0}
              </h4>
            </div>

            <h5 className="relative z-20 text-center">{summary.title}</h5>
            <hr className="h-0.5 border-t-0 bg-neutral-200" />
            <p className="text-center">
              {summary.latestDate
                ? new Date(summary.latestDate).toLocaleString()
                : "-"}
            </p>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default DashboardFileSummary;
