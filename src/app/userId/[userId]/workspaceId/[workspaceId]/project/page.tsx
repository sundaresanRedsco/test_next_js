// import ProjectOverview from "@/app/apiflow_Pages/pages/Projects/ProjectOverview";

import ProjectHomePage from "@/app/apiflow_Pages/projects/ProjectHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      {/* <ProjectOverview
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
      <ProjectHomePage />
    </div>
  );
}
