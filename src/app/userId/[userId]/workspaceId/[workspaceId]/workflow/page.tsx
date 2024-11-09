// import { redirect } from "next/navigation";
// import { cookies } from "next/headers"; // Import cookies from next/headers
// import axios from "axios";
// import { NextResponse } from "next/server";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/auth";
// // import Overview from "@/app/apiflow_Pages/pages/Workflow/overView";
import WorkflowHomePage from "@/app/apiflow_Pages/WorkflowHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  // const response = NextResponse.next();
  // const cookieStore = cookies();
  // const allCookies = cookieStore.getAll();

  // const session: any = await getServerSession(authOptions);
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];

  // if (session == null) {
  //   // Redirect to the /sign page if the user is not authenticated (no session)
  //   redirect("/sign");
  //   return null;
  // }
  // console.log("Session Data New:", session);

  // const userIdCookieValue: any =
  //   (session ? session.user : null) ||
  //   cookies().get(process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "")?.value ||
  //   null;

  // // Use the session or fallback user profile value
  // const userProfileVal = userIdCookieValue;
  // const roleId = userProfileVal?.role_id;

  // let permissionsData: any[] = [];

  // const urlTabs = context?.searchParams?.tabs
  //   ? (context.searchParams.tabs as string).split(",")
  //   : [];

  // console.log(context, "contextcontext");

  // // Mapping of tab IDs to corresponding permission names
  // const tabPermissions = [
  //   {
  //     id: "get_started", // Tab ID for ProjectPage
  //     moduleName: "public",
  //     subModuleName: "public",
  //     requiredPermission: "public",
  //   },
  //   {
  //     id: "pro_", // Tab ID for ProjectPage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Project",
  //     requiredPermission: "GetById",
  //   },
  //   {
  //     id: "Coll_", // Tab ID for CollectionPage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Collection_",
  //     requiredPermission: "GetById",
  //   },
  //   {
  //     id: "Operat_", // Tab ID for OperationPage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Operations",
  //     requiredPermission: "GetOperationById",
  //   },
  //   {
  //     id: "designflow_", // Tab ID for FlowPage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Api_design_flow_service",
  //     requiredPermission: "get_flow_by_id",
  //   },
  //   {
  //     id: "integration_page_", // Tab ID for IntegrationMain
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Integrations",
  //     requiredPermission: "create",
  //   },
  //   {
  //     id: "jira_", // Tab ID for IntegrationList
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Integrations",
  //     requiredPermission: "create",
  //   },
  //   {
  //     id: "post_page_", // Tab ID for PostPage
  //     moduleName: "POST",
  //     subModuleName: "PostPage",
  //     requiredPermission: "GetPostPage",
  //   },
  //   {
  //     id: "import_Environment", // Tab ID for ImportPage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "ImportFromApiGateWay",
  //     requiredPermission: "create",
  //   },
  //   {
  //     id: "new_API_flow", // Tab ID for ApiflowDesignEA
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Api_design_flow_service",
  //     requiredPermission: "create_api_flow",
  //   },
  //   {
  //     id: "integration", // Tab ID for Integrations
  //     moduleName: "INTEGRATION",
  //     subModuleName: "Integrations",
  //     requiredPermission: "GetIntegrations",
  //   },
  //   {
  //     id: "new_workspace", // Tab ID for WorkspacePage
  //     moduleName: "API_MANAGEMENT",
  //     subModuleName: "Workspace_",
  //     requiredPermission: "create",
  //   },
  // ];

  // const userProfile = session; // Replace with your data fetching logic

  // // Helper function to check if a user has the required permission for a tab
  // const hasPermissionForTab = (tabId: string) => {
  //   console.log(tabId, "tabId");
  //   // const tabInfo = tabPermissions.find((tab) => tab.id === tabId);
  //   const tabInfo = tabPermissions.find((tab) =>
  //     String(tabId).includes(String(tab.id))
  //   );

  //   console.log(tabInfo, "tabInfo");
  //   if (!tabInfo) return false;

  //   const { moduleName, subModuleName, requiredPermission } = tabInfo;

  //   const isPublicTab = requiredPermission === "public"; // Adjust as needed

  //   if (isPublicTab) {
  //     return true; // Public tabs are always accessible
  //   }

  //   const module = userPermissions.find((mod: any) =>
  //     mod.moduleName.includes(moduleName)
  //   );
  //   if (!module) return false;

  //   // Find the matching sub-module within the module
  //   const subModule = module.permissions.find((perm: any) =>
  //     perm.subModuleName.includes(subModuleName)
  //   );
  //   if (!subModule) return false;

  //   // Check if the user has the required permission
  //   return subModule.subPermissions.includes(requiredPermission);
  // };

  // const handleFilteringTabs = () => {
  //   // Filter allowed tabs based on user permissions
  //   allowedTabs = urlTabs.filter(hasPermissionForTab);

  //   // Default to 'get_started' if no tabs are allowed
  //   if (allowedTabs.length === 0) {
  //     allowedTabs = ["get_started"];
  //   }
  // };

  // console.log(urlTabs.filter(hasPermissionForTab), "allowedTabs");

  // //for fetching permissions
  // const handleFetchPermission = async () => {
  //   const cookiePermissions = cookieStore.get("userPermissions")?.value;
  //   if (cookiePermissions) {
  //     userPermissions = JSON.parse(cookiePermissions);
  //     handleFilteringTabs();
  //     return { urlTabs, allowedTabs, userPermissions };
  //   }

  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getallpermission_by_role_id?RoleId=${roleId}`
  //     );
  //     userPermissions = data;
  //     response.cookies.set("userPermissions", JSON.stringify(data), {
  //       maxAge: 60 * 60,
  //     }); // cache for 1 hour
  //     handleFilteringTabs();

  //     return { urlTabs, allowedTabs, userPermissions };
  //   } catch (error) {
  //     console.error("Failed to fetch permissions:", error);
  //     return { urlTabs, allowedTabs: ["get_started"], userPermissions: [] };
  //   }
  // };

  // let data;

  // // if (tokenVal && tokenExpireVal) {
  // if (userProfile && userProfile?.user?.user_id) {
  //   //some logic
  //   data = await handleFetchPermission();
  //   console.log(data, "datasdsdataas");
  // }
  // console.log(urlTabs, "Initial URL Tabs");
  // console.log(allowedTabs, "Filtered Allowed Tabs");

  return (
    <div>
      <WorkflowHomePage />
    </div>
  );
}
