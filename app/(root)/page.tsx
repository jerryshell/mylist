import { Chart } from "@/components/Chart";
import DashboardFileSummary from "@/components/DashboardFileSummary";
import RecentUploadFileList from "@/components/RecentUploadFileList";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 16 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="flex h-full gap-4">
      <div className="">
        <Chart used={totalSpace.used} />
        <DashboardFileSummary usageSummary={usageSummary} />
      </div>
      <div className="flex-1">
        <RecentUploadFileList files={files} />
      </div>
    </div>
  );
};

export default Dashboard;
