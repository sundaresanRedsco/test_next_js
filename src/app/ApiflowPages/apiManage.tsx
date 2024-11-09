"use client";

import React, { useEffect, useState } from "react";
import GlobalSearchBar from "../ApiFlowComponents/Global/GlobalSearchBar";
import { Box, TabScrollButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GlobalAlert from "../ApiFlowComponents/Global/GlobalAlert";
import ImportPage from "./ApiManagement/ImportPage";
import ProjectPage from "./ApiManagement/ProjectPage";
// import Integrations from "../Pages/Integrations/integrations";
import WorkspacePage from "./ApiManagement/WorkspacePage";
import { setRemoveTabs, setTabs, tabsReducer } from "../Redux/tabReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../Redux/store";
import CollectionPage from "./ApiManagement/CollectionPage";
import FlowPage from "./ApiManagement/FlowPage";
import OperationPage from "./ApiManagement/OperationPage";
import IntegrationPage from "./ApiManagement/IntegrationPages/IntegrationPage";
import IntegrationMain from "./ApiManagement/IntegrationPages/IntegrationMain";
import IntegrationList from "./ApiManagement/IntegrationPages/IntegrationList";
import PostPage from "./PostPages/PostPage";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LoaderBox from "../ApiFlowComponents/Global/loader/loaderBox";

const WorkSpace = dynamic(() => import("./ApiManagement/WorkspacePage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Project = dynamic(() => import("./ApiManagement/ProjectPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Collection = dynamic(() => import("./ApiManagement/CollectionPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Opperation = dynamic(() => import("./ApiManagement/OperationPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Flow = dynamic(() => import("./ApiManagement/FlowPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Integrations = dynamic(
  () => import("./ApiManagement/IntegrationPages/IntegrationMain"),
  {
    loading: () => <LoaderBox />,
    ssr: false,
  }
);

const IntegrationsList = dynamic(
  () => import("./ApiManagement/IntegrationPages/IntegrationList"),
  {
    loading: () => <LoaderBox />,
    ssr: false,
  }
);

const Post = dynamic(() => import("./PostPages/PostPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const ImportSCard = dynamic(() => import("./ApiManagement/ImportCard"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const Imports = dynamic(() => import("./ApiManagement/ImportPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

// // import Integrations from "../Pages/Integrations/integrations";
const FlowDesign = dynamic(() => import("./ApiManagement/ApiflowDesignPage"), {
  loading: () => <LoaderBox />,
  ssr: false,
});

const IntegrationNew = dynamic(
  () => import("../Pages/Integrations/integrations"),
  {
    loading: () => <LoaderBox />,
    ssr: false,
  }
);

const SearchContainer = styled(Box)`
  // background: ${({ theme }) => theme.palette.primaryWhite.main};
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  padding: 10px 8px;
  margin: 10px;
`;
interface Props {
  allowedTabs: string[];
}

// function ApiManage({ allowedTabs: initialAllowedTabs = [] }: Props) {
function ApiManage(props: any) {
  const { allowedTabs } = props;
  console.log(allowedTabs, "allowedTabsApiManage");
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // const [ErrorMsg, SetErrorMsg] = useState(false)
  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );
  console.log(tabs, "tabsdfdfd");

  const renderTabContent = (tab: string, extraProps?: any) => {
    console.log(tab, "RenderTab");
    if (tab.includes("pro_")) {
      return <Project {...extraProps} />;
    }

    if (tab.includes("Coll_")) {
      return <Collection {...extraProps} />;
    }

    if (tab.includes("Operat_")) {
      return <Opperation {...extraProps} />;
    }

    if (tab.includes("designflow_")) {
      return <Flow {...extraProps} />;
    }

    if (tab.includes("integration_page_")) {
      return <Integrations {...extraProps} />;
    }
    if (tab.includes("jira") || tab.includes("pager_duty")) {
      return <IntegrationsList {...extraProps} />;
    }
    if (tab.includes("post_page")) {
      return <Post {...extraProps} />;
    }
    switch (tab) {
      case "get_started":
        return <ImportSCard {...extraProps} />;
      case "import_Environment":
        return <Imports {...extraProps} />;
      case "new_API_flow":
        return <FlowDesign {...extraProps} />;
      case "integration":
        return <IntegrationNew {...extraProps} />;
      case "new_workspace":
        return <WorkSpace {...extraProps} />;
      // case "integration_page_service_now":
      //   return <IntegrationPage {...extraProps} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    // Extract the tabs parameter from the URL if it exists
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams, "urlParams");
    const tabsFromUrl = urlParams?.get("tabs")?.split(",") || [];
    console.log(tabsFromUrl, "urlParams");
    urlParams.set("tabs", allowedTabs.join(","));
    // Update the URL with the new tab
    const newSearch = `?${urlParams.toString()}`;

    if (allowedTabs.length > 0) {
      // If there are tabs in the URL, set them to the Redux states
      // dispatch(setTabs(tabsFromUrl));
      dispatch(setTabs(allowedTabs));
      window.history.replaceState(null, "", newSearch);
      // router.replace(`${window.location.pathname}${newSearch}`);
    } else {
      // If no tabs in the URL, handle default logic
      const defaultTab = "get_started"; // Replace with your actual default tab
      let tempArr = [defaultTab];
      dispatch(setTabs(tempArr));
      window.history.replaceState(null, "", newSearch);
      // router.replace(`${window.location.pathname}${newSearch}`);
    }
  }, [allowedTabs]);

  // useEffect(() => {
  //   if (isMounted) {
  //     // Ensure this logic only runs on the client side
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const tabsFromUrl = urlParams.get("tabs")?.split(",") || [];

  //     console.log(tabsFromUrl, "Tabs from URL");

  //     // Filter out the unwanted tab
  //     const filteredTabs = tabsFromUrl.filter((tab) =>
  //       allowedTabs.includes(tab)
  //     );

  //     if (filteredTabs.length > 0) {
  //       // Update the `tabs` parameter in the URL with the remaining tabs
  //       urlParams.set("tabs", filteredTabs.join(","));

  //       // Rebuild the URL query string
  //       const newSearch = `?${urlParams.toString()}`;

  //       // Replace the URL without reloading the page
  //       router.replace(`${window.location.pathname}${newSearch}`, undefined);
  //     }
  //   }
  // }, [isMounted, router]);

  const handleClose = (id: string) => {
    dispatch(setRemoveTabs(id));
  };

  // log
  return (
    <div>
      <div>
        <SearchContainer>
          <GlobalSearchBar
            // onChange={(e: {
            //   target: { value: React.SetStateAction<string> };
            // }) => setSearchQuery(e.target.value)}
            placeholder={"Smart Search"}
          />
        </SearchContainer>
        {/* <GlobalAlert text={"asas"} type={"succcess"}        /> */}
        {/* <GlobalAlert AlertText={"10 Security Risks Found"} type={"Success"} /> */}

        {/* {tabs?.map((x) => ( */}
        {tabs?.map((x: any) => (
          <div key={x}>
            {renderTabContent(x, {
              id: x,
              onCloseHandler: handleClose,
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiManage;

// import { usePathname, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootStateType } from "../Redux/store"; // Adjust the path as per your project structure
// import { setTabs, setRemoveTabs, tabsReducer } from "../Redux/tabReducer"; // Adjust the path as per your project structure
// import ProjectPage from "./ApiManagement/ProjectPage";
// import CollectionPage from "./ApiManagement/CollectionPage";
// import WorkspacePage from "./ApiManagement/WorkspacePage";
// import ImportCardPage from "./ApiManagement/ImportCard";
// import ImportPage from "./ApiManagement/ImportPage";
// import OperationPage from "./ApiManagement/OperationPage";
// import FlowPage from "./ApiManagement/FlowPage";
// import IntegrationMain from "./ApiManagement/IntegrationPages/IntegrationMain";
// import IntegrationList from "./ApiManagement/IntegrationPages/IntegrationList";
// import PostPage from "./PostPages/PostPage";
// import ApiflowDesignEA from "./ApiManagement/ApiflowDesignPage";
// import Integrations from "../Pages/Integrations/integrations";

// interface Props {
//   allowedTabs: string[];
// }

// const ApiManage = ({ allowedTabs: initialAllowedTabs = [] }: Props) => {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const dispatch = useDispatch();

//   // Access tabs state from Redux
//   const { tabs } = useSelector<RootStateType, tabsReducer>(
//     (state) => state.tabs
//   );

//   const [currentTab, setCurrentTab] = useState<string | null>(null);
//   const userRole = "user"; // Change this manually to 'admin', 'user', or 'guest'

//   useEffect(() => {
//     // Get the 'tabs' parameter from the URL and set the current tab
//     const tab = searchParams.get("tabs");
//     setCurrentTab(tab || "get_started");
//   }, [searchParams]);

//   // Update Redux store with allowedTabs based on user role
//   useEffect(() => {
//     const availableTabs = staticUserRoles[userRole] || [];
//     const allowedTabs =
//       availableTabs.length > 0 ? availableTabs : ["get_started"];
//     dispatch(setTabs(allowedTabs));
//   }, [dispatch, userRole]);

//   const handleClose = (id: string) => {
//     dispatch(setRemoveTabs(id));
//   };

//   // Prevent rendering of tabs not allowed for the current user role
//   const filteredTabs = tabs.filter((tab) =>
//     staticUserRoles[userRole]?.includes(tab)
//   );

//   return (
//     <div>
//       {filteredTabs.length > 0 ? (
//         <div>
//           {filteredTabs.map((tab: any) => (
//             <div key={tab}>
//               {renderTabContent(tab, {
//                 id: tab,
//                 onCloseHandler: handleClose,
//               })}{" "}
//               {/* Render the content for the current tab */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// // Function to render content based on the current tab
// const renderTabContent = (tab: string, extraProps?: any) => {
//   if (tab.includes("pro_")) {
//     return <ProjectPage {...extraProps} />;
//   }

//   if (tab.includes("Coll_")) {
//     return <CollectionPage {...extraProps} />;
//   }

//   if (tab.includes("Operat_")) {
//     return <OperationPage {...extraProps} />;
//   }

//   if (tab.includes("designflow_")) {
//     return <FlowPage {...extraProps} />;
//   }

//   if (tab.includes("integration_page_")) {
//     return <IntegrationMain {...extraProps} />;
//   }
//   if (tab.includes("jira") || tab.includes("pager_duty")) {
//     return <IntegrationList {...extraProps} />;
//   }
//   if (tab.includes("post_page")) {
//     return <PostPage {...extraProps} />;
//   }
//   switch (tab) {
//     case "get_started":
//       return <ImportCardPage {...extraProps} />;
//     case "import_Environment":
//       return <ImportPage {...extraProps} />;
//     case "new_API_flow":
//       return <ApiflowDesignEA {...extraProps} />;
//     case "integration":
//       return <Integrations {...extraProps} />;
//     case "new_workspace":
//       return <WorkspacePage {...extraProps} />;
//     // case "integration_page_service_now":
//     //   return <IntegrationPage {...extraProps} />;

//     default:
//       return null;
//   }
// };

// // Static role-based permissions
// const staticUserRoles: { [key: string]: string[] } = {
//   admin: ["pro_", "Coll_", "get_started", "new_workspace"],
//   user: ["new_workspace", "import_Environment"], // User can access these tabs
//   guest: ["get_started"], // Guest can only access 'get_started'
// };

// // Server-side logic to handle role-based tab permissions

// export const getServerSideProps = async (context: any) => {
//   const userRole = "user"; // Set to guest for this scenario

//   // Fetch available tabs based on static role permissions
//   const availableTabs = staticUserRoles[userRole] || [];

//   // Retrieve tabs from the URL, if any
//   const urlTabs = context.query.tabs
//     ? (context.query.tabs as string).split(",")
//     : [];
//   let allowedTabs = urlTabs.filter((tab) => availableTabs.includes(tab));

//   // Default to 'get_started' if no tabs are allowed
//   if (allowedTabs.length === 0) {
//     allowedTabs = ["get_started"];
//   }

//   return {
//     props: {
//       allowedTabs,
//     },
//   };
// };

// export default ApiManage;

// console.log("getServerSideProps called" ,context);

// const urlTabs = context?.searchParams?.tabs
//   ? (context.searchParams.tabs as string).split(",")
//   : [];

//   console.log("urlTabs" ,urlTabs);
// // Example RoleId; you might want to retrieve this from context or session
// const roleId = "d2e1c42f-0e4a-4d63-920c-adc33292b793";

// console.log(roleId, "roleId");
// // Fetch permissions from the API
// let userPermissions = [];
// try {
//   const response = await axios.get(
//     `https://api.apiflow.pro/api/auth/getallpermission_by_role_id?RoleId=${roleId}`
//   );
//   userPermissions = response.data; // Adjust the response structure if needed
//   console.log("User Permissions:", userPermissions);
// } catch (error) {
//   console.error("Failed to fetch permissions:", error);
// }

// // Mapping of tab IDs to corresponding permission names
// const tabPermissions = [
//   {
//     id: "pro_", // Tab ID for ProjectPage
//     moduleName: "API_MANAGEMENT",
//     subModuleName: "Project",
//     requiredPermission: "GetById",
//   },
//   {
//     id: "coll_", // Tab ID for CollectionPage
//     moduleName: "API_MANAGEMENT",
//     subModuleName: "Collection",
//     requiredPermission: "GetCollection",
//   },
//   {
//     id: "operat_", // Tab ID for OperationPage
//     moduleName: "API_MANAGEMENT",
//     subModuleName: "Operation",
//     requiredPermission: "GetOperation",
//   },
//   {
//     id: "designflow_", // Tab ID for FlowPage
//     moduleName: "API_MANAGEMENT",
//     subModuleName: "DesignFlow",
//     requiredPermission: "GetDesignFlow",
//   },
//   {
//     id: "integration_page_", // Tab ID for IntegrationMain
//     moduleName: "INTEGRATION",
//     subModuleName: "IntegrationPage",
//     requiredPermission: "GetIntegrationPage",
//   },
//   {
//     id: "jira_", // Tab ID for IntegrationList
//     moduleName: "INTEGRATION",
//     subModuleName: "Jira",
//     requiredPermission: "GetJira",
//   },
//   {
//     id: "post_page_", // Tab ID for PostPage
//     moduleName: "POST",
//     subModuleName: "PostPage",
//     requiredPermission: "GetPostPage",
//   },
//   {
//     id: "import_Environment", // Tab ID for ImportPage
//     moduleName: "IMPORT",
//     subModuleName: "Environment",
//     requiredPermission: "GetImportEnvironment",
//   },
//   {
//     id: "new_API_flow", // Tab ID for ApiflowDesignEA
//     moduleName: "API_FLOW",
//     subModuleName: "NewAPIFlow",
//     requiredPermission: "CreateNewAPIFlow",
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

// // Helper function to check if a user has the required permission for a tab
// const hasPermissionForTab = (tabId: string) => {
//   console.log(tabId, "tabId");
//   const tabInfo = tabPermissions.find((tab) => tab.id === tabId);
//   if (!tabInfo) return false;

//   const { moduleName, subModuleName, requiredPermission } = tabInfo;

//   // Find the matching module from the user permissions
//   const module = userPermissions.find(
//     (mod: any) => mod.moduleName === moduleName
//   );
//   if (!module) return false;

//   // Find the matching sub-module within the module
//   const subModule = module.permissions.find(
//     (perm: any) => perm.subModuleName === subModuleName
//   );
//   if (!subModule) return false;

//   // Check if the user has the required permission
//   return subModule.subPermissions.includes(requiredPermission);
// };

// // Filter allowed tabs based on user permissions
// let allowedTabs = urlTabs.filter(hasPermissionForTab);

// // Default to 'get_started' if no tabs are allowed
// if (allowedTabs.length === 0) {
//   allowedTabs = ["get_started"];
// }
// console.log(allowedTabs, "allowedTabs");
