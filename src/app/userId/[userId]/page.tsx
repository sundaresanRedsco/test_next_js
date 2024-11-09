import OverviewDashboard from "@/app/apiflow_Pages/pages/overviewDashboard";
import WorkspacePage from "@/app/apiflow_Pages/workspace/WorkspacePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      <WorkspacePage />
      {/* <OverviewDashboard
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
    </div>
  );
}
