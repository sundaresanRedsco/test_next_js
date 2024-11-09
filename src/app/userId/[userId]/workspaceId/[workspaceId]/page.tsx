import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Import cookies from next/headers
import axios from "axios";
import { NextResponse } from "next/server";
import dynamic from "next/dynamic";
import GlobalLoader from "@/app/Components/Global/GlobalLoader";
// Make sure this points to your NextAuth options
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import WorkspaceOverview from "@/app/apiflow_Pages/pages/workspaceOverview";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      <WorkspaceOverview
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      />
    </div>
  );
}
