// import Environments from "@/app/apiflow_Pages/pages/workspace/environments";

import WorkspaceEnvironments from "@/app/apiflow_Pages/workspace/settings/WorkspaceEnvironments";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];

  return (
    <div>
      <WorkspaceEnvironments />
      {/* <Environments
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
    </div>
  );
}
