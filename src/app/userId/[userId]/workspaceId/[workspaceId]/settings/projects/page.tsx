// import Projects from "@/app/apiflow_Pages/pages/workspace/projects";

import WorkspaceProjects from "@/app/apiflow_Pages/workspace/settings/WorkspaceProjects";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      {/* <Projects allowedTabs={allowedTabs} userPermissions={userPermissions} /> */}
      <WorkspaceProjects />
    </div>
  );
}
