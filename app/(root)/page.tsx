import Chart from "@/components/Chart";
import DashboardFileSummary from "@/components/DashboardFileSummary";
import RecentUploadFileList from "@/components/RecentUploadFileList";
import { getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getUsageSummary } from "@/lib/utils";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const totalSpace = await getTotalSpaceUsed().catch(() => redirect("/login"));
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="flex h-full gap-4">
      <div className="">
        <Chart used={totalSpace.used} />
        <DashboardFileSummary usageSummary={usageSummary} />
      </div>
      <div className="flex-1">
        <RecentUploadFileList />
      </div>
    </div>
  );
};

export default Dashboard;
