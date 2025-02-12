import OverviewChannel from "@/app/apiflow_Pages/pages/Channel/overViewChannel";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <OverviewChannel />
    </div>
  );
}
