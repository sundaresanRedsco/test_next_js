// import EnvironmentOverview from "@/app/apiflow_Pages/pages/Environment/EnvironmentOverview";

import CollectionPage from "@/app/apiflow_Pages/collections/collectionPage";

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
      <CollectionPage />
    </div>
  );
}
