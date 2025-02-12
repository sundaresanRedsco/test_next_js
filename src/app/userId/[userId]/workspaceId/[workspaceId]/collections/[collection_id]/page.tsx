import CollectionPage from "@/app/apiflow_Pages/collections/collectionPage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <CollectionPage />
    </div>
  );
}
