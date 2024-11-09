// import EnvironmentOverview from "@/app/apiflow_Pages/pages/Environment/EnvironmentOverview";

import EnvironmentHomePage from "@/app/apiflow_Pages/EnvironmentHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      {/* <EnvironmentOverview
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
      <EnvironmentHomePage />
    </div>
  );
}
