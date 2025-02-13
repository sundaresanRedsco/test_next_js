import EnvironmentHomePage from "@/app/apiflow_Pages/EnvironmentHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <EnvironmentHomePage />
    </div>
  );
}
