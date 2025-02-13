import Profile from "@/app/apiflow_Pages/settings/profile";

export default function Home(context: { searchParams: { tabs?: string } }) {
  return (
    <div>
      <Profile />
      {/* <AccountsSettings /> */}
    </div>
  );
}
