import OverviewOperation from "@/app/apiflow_Pages/pages/Operation/overViewOperation";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      <OverviewOperation
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      />
    </div>
  );
}
