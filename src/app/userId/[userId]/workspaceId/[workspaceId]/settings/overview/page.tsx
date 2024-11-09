import OverviewSettings from "@/app/apiflow_Pages/pages/workspace/overwiewSettings";
import OverView from "@/app/apiflow_Pages/workspace/settings/Overview";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];

  return (
    <div>
      <OverView />
      {/* <OverviewSettings
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
    </div>
  );
}
