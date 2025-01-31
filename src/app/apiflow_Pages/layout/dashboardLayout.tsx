"use client";
import React, {
  MutableRefObject,
  Suspense,
  useRef,
  useState,
  useEffect,
} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import {
  CommonReducer,
  GetRefreshToken,
  initializeSession,
  selectContainer,
  // fetchPermissions,
} from "../../Redux/commonReducer";
import {
  fetchPermissions,
  setPermissionState,
} from "../../Redux/permissionReducer/permissionReducer";

import { logout } from "../../Redux/loginReducer";
import Cookies from "js-cookie";
import { PrimaryTypography, SecondaryTypography } from "../../Styles/signInUp";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import { darkTheme, lightTheme } from "../../../Theme/theme";
import ApiManage from "../../ApiflowPages/apiManage";
import {
  GetWorkspacesById,
  workspaceReducer,
} from "../../Redux/apiManagement/workspaceReducer";
import {
  environmentReducer,
  GetAllStagesByProjectId,
  GetProjectById,
} from "../../Redux/apiManagement/environmentReducer";
import { AlertProvider } from "../../../context/alertContext";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import GlobalCircularLoader from "../../Components/Global/GlobalCircularLoader";
import { getCookies } from "../../Helpers/helpersFunctions";
import { useSession } from "next-auth/react";
import SidebarComponent from "../../apiflow_components/SidebarComponent";
import { SidebarIcon } from "../../Assests/icons";
import { useSideBarStore } from "@/app/hooks/sideBarStore";
import useSecuredRoutes from "@/app/hooks/useSecuredRoutes";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import GLoader from "@/app/apiflow_components/global/GLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/app/hooks/useWebSocket";

const fetchWorkspace = (
  dispatch: any,
  pathname: string,
  currentWorkspace: any
) => {
  const parts = pathname.split("/");
  const workspaceIdIndex = parts.indexOf("workspaceId") + 1;
  console.log(pathname, "GetWorkspacesById");
  const workspace_id = parts[workspaceIdIndex] || "";
  if (workspace_id) {
    if (currentWorkspace?.id !== workspace_id) {
      dispatch(GetWorkspacesById(workspace_id))
        .unwrap()
        .then((res: any) => {
          // Handle success
        })
        .catch((err: any) => {
          // Handle error
        });
    }
  }
};

// const fetchProject = (
//   dispatch: any,
//   pathname: string,
//   currentEnvironment: any
// ) => {
//   // const parts = pathname.split("/");
//   // const projectIdIndex = parts.indexOf("projects") + 1;
//   const projectId = getCookies(
//     process.env.NEXT_PUBLIC_COOKIE_USERPROFILE ?? ""
//   );
//   console.log(projectId, "projectIdDAS");
//   const parts = pathname.split("/");
//   const workspaceIdIndex = parts.indexOf("workspaceId") + 1;
//   const workspace_id = parts[workspaceIdIndex] || "";
//   if (projectId && workspace_id) {
//     if (currentEnvironment !== projectId) {
//       dispatch(
//         GetProjectById({ project_id: projectId, workspace_id: workspace_id })
//       )
//         .unwrap()
//         .then((res: any) => {
//           dispatch(GetAllStagesByProjectId(projectId));
//         })
//         .catch((err: any) => {
//           // Handle error
//         });
//     }
//   }
// };

const SidebarContainer = styled(Box)<{ isCollapsed: boolean }>`
  position: relative;
  display: flex;
  // height: 100vh;
  // width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "280px")};

  transition: width 0.3s linear;

  // @media (min-width: 1440px) {
  //   width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "280px")};
  // }

  // @media (max-width: 768px) {
  //   width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  // }
`;

const SidebarIconWithRotation = styled(SidebarIcon)<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: -10px;
  cursor: pointer;
  transition: transform 0.5s ease; // Smooth transition for the rotation
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
export const queryClient = new QueryClient();
const DashboardLayout = ({ children }: any) => {
  //   const { allowedTabs, userPermissions } = props;
  const { data: session, status } = useSession(); // Get session data and status
  useSecuredRoutes();

  const isMounted = useRef(true);
  const pathname = usePathname();
  console.log("pathnameDashboard: ", pathname);

  const { loading, themeValue } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [themeMode, setThemeMode] = useState<"light" | "dark">(themeValue);
  const theme = themeValue === "light" ? lightTheme : darkTheme;

  const MainContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const locationVal = pathname.split("/");
  let wsidVal = locationVal[4];

  const common = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSideBarStore();
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  console.log(
    common?.userProfile?.user?.expiration_time,
    common?.userProfile?.user?.user_id,
    common?.userProfile?.user,
    "userProfile"
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const deleteAllCookies = () => {
    // Get all cookies
    const allCookies = Cookies.get();

    // Loop through all cookies and remove them
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  // Function to check session expiration
  const checkSessionExpiration = () => {
    const tokenExpiresAt = session?.user?.expiration_time; // Get expiration time from session
    const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp

    if (tokenExpiresAt && currentTime >= tokenExpiresAt) {
      // Session expired, logout and redirect to sign-in
      dispatch(logout()); // Clear user session state
      deleteAllCookies(); // Delete cookies
      router.push("/sign"); // Redirect to sign-in page
    }
  };

  // Set up an interval to check session expiration every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkSessionExpiration();
    }, 60000); // Check every minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [session]); // Depend on tokenExpiresAt to re-run the effect when it changes

  useEffect(() => {
    if (MainContainer?.current) {
      dispatch(selectContainer(MainContainer.current.id));
    }
  }, [MainContainer]);

  useEffect(() => {
    if (!currentWorkspace && userProfile?.user?.user_id) {
      fetchWorkspace(dispatch, pathname, currentWorkspace);
    }
  }, [currentWorkspace, pathname, userProfile]);

  // useEffect(() => {
  //   if (!currentEnvironment) {
  //     fetchProject(dispatch, pathname, currentEnvironment);
  //   }
  // }, [currentEnvironment, pathname]);

  useEffect(() => {
    dispatch(initializeSession());
  }, []);
  const { isPageLoading } = useGlobalStore();

  console.log(isSidebarCollapsed, "isSidebarCollapsedisSidebarCollapsed");
  if (pathname.includes("/userId")) {
    return (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {" "}
          <WebSocketProvider>
            <AlertProvider>
              <Grid
                container
                sx={{ height: "100%", position: "relative" }}
                spacing={2}
              >
                {isPageLoading && <GLoader />}
                <Grid
                  sx={{ width: "max-content", transition: "width 0.3s linear" }}
                >
                  <SidebarContainer isCollapsed={isSidebarCollapsed}>
                    <SidebarComponent
                      isCollapsed={isSidebarCollapsed}
                      setIsSidebarCollapsed={setIsSidebarCollapsed}
                      onClick={toggleSidebar}
                    />
                    {/* <button style={{color:"red"}}>close</button> */}
                    {/* <SidebarIconWithRotation
                  isOpen={isSidebarCollapsed} // Pass the state to the styled component
                  onClick={toggleSidebar}
                /> */}
                  </SidebarContainer>
                </Grid>
                <Grid
                  sx={{
                    overflowY: "auto",
                    height: "100vh",
                    flex: 1,
                    transition: "width 0.3s linear",
                    padding: { lg: "10px", md: "0px" },
                  }}
                  id="mainContainer"
                >
                  {children}
                </Grid>
              </Grid>
            </AlertProvider>
          </WebSocketProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  } else {
    return children;
  }
};

export default DashboardLayout;
