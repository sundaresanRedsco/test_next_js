import WorkspaceOverview from "@/app/apiflow_Pages/pages/workspaceOverview";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      <WorkspaceOverview
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      />
    </div>
  );
}
