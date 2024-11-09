import OverviewChannel from "@/app/apiflow_Pages/pages/Channel/overViewChannel";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      <OverviewChannel
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      />
    </div>
  );
}
