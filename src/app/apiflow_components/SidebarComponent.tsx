import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { styled } from "@mui/system";
import theme from "@/Theme/theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DarkThemeV2Icon from "../Assests/icons/v2DarkThemeIcon.svg";
import NounV2Integration from "../Assests/icons/v2noun-integration.svg";
import NounV2Menu from "../Assests/icons/v2noun-menu.svg";
import { translate } from "../Helpers/helpersFunctions";
import NounV2Chat from "../Assests/icons/v2noun-chat.svg";
import ApiTraceLogo from "../Assests/icons/logoNew.svg";
import MenuImage from "../Assests/icons/VectorNew.svg";
import MenuExpand from "../Assests/icons/SidebarMenu.svg";
import MenuSearch from "../Assests/icons/sidebarSearch.svg";
import MenuMessage from "../Assests/icons/SidebarMessage.svg";
import MenuSettings from "../Assests/icons/SidebarSettings.svg";
import MenuMaximize from "../Assests/icons/SidebarMaximize.svg";
import MenuAccount from "../Assests/icons/SidebarAccount.svg";
import MenuLogout from "../Assests/icons/SidebarLogout.svg";
import { HeaderTextTypography } from "../Styles/signInUp";

import ChannelComponent from "./SidebarSubComponent/ChannelComponent";
import ProjectsComponet from "./SidebarSubComponent/ProjectsComponet";
import WorkspaceComponent from "./SidebarSubComponent/workspaceSideComponents/WorkspaceSettings";

import { useDispatch, useSelector } from "react-redux";
import { resetGatewayStateProject } from "../Redux/apiManagement/projectReducer";
import { resetGatewayStateApiGateway } from "../Redux/apiManagement/apiGatewayReducer";
import {
  clearFlowList,
  resetGatewayStateFlow,
} from "../Redux/apiManagement/flowReducer";
import Cookies from "js-cookie";
import {
  resetGatewayStateSwaggerDoc,
  resetSwaggerState,
} from "../Redux/apiManagement/swaggerDocReducer";
import { resetGatewayStatePolicy } from "../Redux/apiRisk/policyReducer";
import { resetGatewayStateProjectRisk } from "../Redux/apiRisk/projectRiskreducer";
import { resetGatewayStateRiskApi } from "../Redux/apiRisk/riskApiReducer";
import { resetGatewayStateSensitiveData } from "../Redux/apiRisk/senstiveDataReducer";
import { resetGatewayStateVulnerability } from "../Redux/apiRisk/vulnerabilityReducer";
import { resetGatewayStateApiTestingDash } from "../Redux/apiTesting/apiTestingDashboardReducer";
import { resetGatewayStateTestRunner } from "../Redux/apiTesting/testRunnerReducer";
import { resetGatewayStateMembers } from "../Redux/manageTeam/membersReducer";
import { resetGatewayStateRolesPermisssion } from "../Redux/manageTeam/rolesandPermissionReducer";
import { resetGatewayStateTeam } from "../Redux/manageTeam/teamReducer";
import { resetGatewayStateAccount } from "../Redux/settings/accountReducer";
import { resetGatewayStateApiKey } from "../Redux/settings/apikeyReducer";
import { logout, resetGatewayStateLogin } from "../Redux/loginReducer";
import { resendOtp, resetGatewayStateSignUp } from "../Redux/signupReducer";
import { resetGatewayStateApiActivity } from "../Redux/apiIntelligence/apiActivityReducer";
import { resetGatewayStateApiAnalytics } from "../Redux/apiIntelligence/apiAnalyticsReducer";
import { resetGatewayStateApiEndpoint } from "../Redux/apiIntelligence/apiEndPointReducer";
import { resetGatewaySensibleMetrics } from "../Redux/apiRisk/sensibleMetricsReducer";
import { CommonReducer, resetGatewayStateCommon } from "../Redux/commonReducer";
import store, { RootStateType } from "../Redux/store";
import {
  resetWorkspaceState,
  workspaceReducer,
} from "../Redux/apiManagement/workspaceReducer";
import { usePathname, useRouter } from "next/navigation";
import { resetEnvironmentState } from "../Redux/apiManagement/environmentReducer";
import { useSignUpStore } from "../hooks/sign/signZustand";
import { SidebarIcon } from "../Assests/icons";
import { getItems, removeItem, setItem } from "../Services/localstorage";
import useMuiBreakpoints from "../hooks/useMuiBreakpoints";
import IconLayout from "./global/IconLayout";
import { useGlobalStore } from "../hooks/useGlobalStore";
import { resetProjectList } from "../Redux/apiManagement/projectApiReducer";
import { resetCollOperTreeData } from "../Redux/apiManagement/endpointReducer";
import SettingsSidebar from "./SidebarSubComponent/SettingsSidebar";
import { usePostStore } from "../store/usePostStore";
import toast from "react-hot-toast";
import { connectToMqtt } from "../Helpers/mqttHelpers";
import { useSideBarStore } from "../hooks/sideBarStore";

interface SidebarContainerProps {
  expanded?: boolean;
  children?: ReactNode;
}

interface SubMenuItemProps {
  active?: boolean;
  children?: ReactNode;
}

interface SidebarMenuProps {
  children?: ReactNode;
  isSidebarCollapsed: boolean; // Control collapse state
}

const SidebarCon = styled(Box)<SidebarContainerProps>`
  background: ${({ theme }) => theme.palette.iconSidebarBackground.main};
  width: 60px; // Width based on 'expanded' prop
  @media (min-width: 1440px) {
    width: 60px;
  }
  @media (max-width: 768px) {
    .element {
      width: 25px;
    }
  }
  @media (max-width: 480px) {
    .element {
      width: 20px;
    }
  }
  padding-top: 1px;
  font-family: Inter-Regular !important;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: width 0.3s linear;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;

const SidebarIconWithRotation = styled(SidebarIcon)<{
  isOpen: boolean;
  showIcon: boolean;
}>`
  position: absolute;
  top: 70px;
  right: -10px;
  cursor: pointer;
  transition: transform 0.5s ease; // Smooth transition for the rotation
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  display: ${({ showIcon }) =>
    showIcon ? "block" : "none"}; // Control visibility
`;

const SubMenuItem = styled(Box)<SubMenuItemProps>`
  cursor: pointer;
  text-align: center;
  // Ensure this height remains consistent
  display: flex;
  align-items: center; // Center the items vertically
  justify-content: center; // Center the items horizontally
  margin: 5px 0; // Combine margin-top and margin-bottom for consistency
  // stroke: ;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.palette.iconSidebarIconColor.main};
  }

  ${({ active }) =>
    active &&
    `
      background: ${theme.palette.iconSidebarIconHoverBackground.main};
      svg {

           fill: white;

      }
    `}
`;

const SidebarMenu = styled(Box)<SidebarMenuProps>`
  width: ${({ isSidebarCollapsed }) => (isSidebarCollapsed ? "0px" : "220px")};
  background: ${({ theme }) => theme.palette.sidebarMainBackground.main};
  height: 100vh;
  padding: 0px;
  padding-top: 20px;
  transition: width 0.3s ease;
`;

function SidebarComponent(props: any) {
  const { setactiveStep, setFormDataStore } = useSignUpStore();
  const { resetAllPostStoreData } = usePostStore();
  const { ismd, issm, islg } = useMuiBreakpoints();
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSideBarStore();
  const { setIsPageLoading, isPageLoading, selectedLink, setSelectedLink } =
    useGlobalStore();
  const dispatch = useDispatch<any>();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(resetProjectList([]));
  }, [isSidebarCollapsed]);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const router = useRouter();

  useEffect(() => {
    if (!userProfile?.user?.user_id) return;

    const topic = `users/${userProfile.user.user_id}/notifications`;

    const mqttClient = connectToMqtt(
      process.env.NEXT_PUBLIC_APP_MQTT_URL as string, // Broker URL
      topic,
      (receivedTopic: any, message: any) => {
        // Handle incoming messages

        let mess = JSON.parse(message);

        toast.success(mess?.message, {
          position: "top-left", // Options: "top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"
        });
      },
      (error: any) => {},
      () => {}
    );

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [userProfile]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle the sidebar state
  };

  useEffect(() => {
    if (selectedLink === "trace" || selectedLink === "dashboard") {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  }, [selectedLink]);
  const baseUrl = `/userId/${userProfile.user.user_id}`;

  const paths = [
    {
      label: `${translate("apiManagementSidebar.API_MANAGEMENT")}`,
      isLogo: true,
      id: "trace",
      icon: (
        <ApiTraceLogo
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      ),
      onClickHandler: (id: any) => {
        setSelectedLink(id);
        sessionStorage.setItem("path-id", id);
      },
    },
    {
      label: "dashboard",
      id: "dashboard",
      icon: <MenuImage style={{ height: "60%", width: "60%" }} />,
      onClickHandler: (id: any, index?: number) => {
        if (pathname != baseUrl) {
          setIsPageLoading(true);
        }
        router.push(`${baseUrl}`);
        setSelectedLink(id);
        setIsSidebarCollapsed(true);
        removeItem(`/sidebarMenuId/${userProfile?.user?.user_id}`);
      },
    },
    {
      label: "API Intelligence",
      id: "apiMan",
      icon: <MenuMaximize style={{ height: "60%", width: "60%" }} />,
      onClickHandler: (id: any) => {
        // if (pathname != baseUrl) {
        //   setIsPageLoading(true);
        // }
        // router.push(`${baseUrl}`);
        // setSelectedLink(id);
        // setIsSidebarCollapsed(false);
        // removeItem(`/sidebarMenuId/${userProfile?.user?.user_id}`);
      },
    },

    {
      label: "Settings",
      path: "",
      id: "settings",
      icon: <MenuSettings style={{ height: "60%", width: "60%" }} />,
      onClickHandler: (id: any, index?: number) => {
        if (pathname != `/userId/${userProfile?.user?.user_id}/settings`) {
          setIsPageLoading(true);
        }
        commonFunctions(id, index);
        setSelectedLink(id);
        router.push(`/userId/${userProfile?.user?.user_id}/settings`);
      },
    },

    {
      label: "Logout",
      path: "",
      id: "logout",
      icon: <MenuLogout style={{ height: "60%", width: "60%" }} />,
      onClickHandler: (id: any) => {
        setIsPageLoading(true);
        setactiveStep(0);
        setFormDataStore("currentPage", "Login");
        handleLogout();
        setIsSidebarCollapsed(true);
        resetAllPostStoreData();
      },
    },
  ];
  useEffect(() => {
    if (isPageLoading) {
      setIsPageLoading(false);
    }
  }, [pathname]);

  const [isOpen, setisOpen] = useState(paths.map(() => ({ open: false })));
  const handleToggle = (index: number) => {
    const tempData = isOpen.map((item, idx) => ({
      open: idx === index ? !item.open : false,
    }));
    setisOpen(tempData);
  };
  const commonFunctions = (id: any, index: number | undefined) => {
    removeItem(`/sidebarMenuId/${userProfile?.user?.user_id}`);
    if (index) {
      handleToggle(index);
    }
    if (index) {
      setIsSidebarCollapsed(isOpen[index]?.open);
    }
    setSelectedLink(id);
    sessionStorage.setItem("path-id", id);
  };
  const deleteAllCookies = () => {
    // Get all cookies
    const allCookies = Cookies.get();

    // Loop through all cookies and remove them
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  const cachedSidebarMenuIdCookie = getItems(
    `/sidebarMenuId/${userProfile?.user?.user_id}`
  );

  useEffect(() => {
    if (
      !!cachedSidebarMenuIdCookie &&
      (pathname.includes("/workspaceId") || pathname.includes("/settings"))
    ) {
      setIsSidebarCollapsed(false);
      setSelectedLink(cachedSidebarMenuIdCookie);
    }
  }, [cachedSidebarMenuIdCookie]);

  const handleLogout = () => {
    dispatch({ type: "RESET_STATE" });
    dispatch(resetGatewayStateProject());
    dispatch(resetSwaggerState());
    dispatch(resetGatewaySensibleMetrics());
    dispatch(resetGatewayStateApiGateway());
    dispatch(resetGatewayStateFlow());
    dispatch(resetGatewayStateSwaggerDoc());
    dispatch(resetGatewayStatePolicy());
    dispatch(resetGatewayStateProjectRisk());
    dispatch(resetGatewayStateRiskApi());
    dispatch(resetGatewayStateSensitiveData());
    dispatch(resetGatewayStateVulnerability());
    dispatch(resetGatewayStateApiTestingDash());
    dispatch(resetGatewayStateTestRunner());
    dispatch(resetGatewayStateMembers());
    dispatch(resetGatewayStateRolesPermisssion());
    dispatch(resetGatewayStateTeam());
    dispatch(resetGatewayStateAccount());

    dispatch(resetGatewayStateApiKey());
    dispatch(resetGatewayStateCommon());
    dispatch(resetGatewayStateLogin());
    dispatch(resetGatewayStateSignUp());
    dispatch(resetGatewayStateApiActivity());
    dispatch(resetGatewayStateApiAnalytics());
    dispatch(resetGatewayStateApiEndpoint());
    dispatch(logout()).then((res: any) => {
      Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "");

      if (store) {
        store?.dispatch({ type: "RESET_STATE" });
      }

      if (res) {
        // window.location.reload();
        deleteAllCookies();
        // signOut({ redirect: false });
        router.push("/sign");
        dispatch(resetWorkspaceState());
        dispatch(resetEnvironmentState());
        localStorage.clear();
      }
    });

    // you may also want to redirect to the login page or perform other actions
  };

  useEffect(() => {
    const activePath = paths.find((link) => {
      if (link.id === "messages") {
        return pathname.match(/^\/userId\/[a-fA-F0-9]+\/channel\/$/);
      } else if (link.id === "ApiIn") {
      } else if (link.id === "dashboard") {
        return pathname.match(/^\/userId\/[a-fA-F0-9]+$/); // Regex for paths like /userId/[id]
        // return pathname.match(/^\/userId\/[a-fA-F0-9]\/dashboard\/+$/); // Regex for paths like /userId/[id]
      } else if (link.id === "apiMan") {
        return pathname.match(
          /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+(\/.*)?$/
        );
        // return pathname.match(/^\/userId\/[a-fA-F0-9]+$/); // Regex for paths like /userId/[id]
      }

      return null;
    });
    if (activePath) {
      setSelectedLink(activePath.id);
    }
  }, [pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarCon
        className="p-0"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* Top section with the first 3 icons */}

        {paths?.slice(0, 3).map((link: any, index: number) => (
          <SubMenuItem
            key={link?.id}
            onClick={
              userProfile?.user?.user_id
                ? () => {
                    link.isLogo ? "" : link.onClickHandler(link?.id, index);
                  }
                : undefined
            }
            active={link?.id === selectedLink}
            sx={{
              borderRadius: link?.id === selectedLink ? "6px" : "0px",
              width: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              height: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconLayout> {link?.icon}</IconLayout>
          </SubMenuItem>
        ))}
        <hr
          style={{
            color: "white",
            border: "solid -10px white",
            width: "80%",
          }}
        />

        {/* Middle section with the next 3 icons */}

        {paths?.slice(3, 6).map((link: any, index: number) => (
          <SubMenuItem
            key={link?.id}
            onClick={
              userProfile?.user?.user_id
                ? () => link.onClickHandler(link?.id, index)
                : undefined
            }
            active={link?.id === selectedLink}
            sx={{
              borderRadius: link?.id === selectedLink ? "6px" : "0px",
              width: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              height: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {link?.icon}
          </SubMenuItem>
        ))}
        <hr
          style={{
            color: "white",
            border: "solid -10px white",
            width: "80%",
          }}
        />

        {/* Bottom section with the last 2 icons */}

        {paths?.slice(6, 8).map((link: any, index: number) => (
          <SubMenuItem
            key={link?.id}
            onClick={
              userProfile?.user?.user_id
                ? () => link.onClickHandler(link?.id, index)
                : undefined
            }
            active={link?.id === selectedLink}
            sx={{
              borderRadius: link?.id === selectedLink ? "6px" : "0px",
              width: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              height: {
                xl: "40px",
                lg: "40px",
                md: "40px",
                sm: "37px",
                xs: "37px",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {link?.icon}
          </SubMenuItem>
        ))}
      </SidebarCon>

      <SidebarMenu
        sx={{
          position: "relative",
        }}
        isSidebarCollapsed={isSidebarCollapsed}
      >
        <HeaderTextTypography
          style={{ fontSize: "13px", fontFamily: "Inter-Medium" }}
        >
          {selectedLink === "apiMan"
            ? ""
            : selectedLink === "messages"
            ? ""
            : selectedLink === "ApiIn"
            ? ""
            : ""}
        </HeaderTextTypography>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {isSidebarCollapsed === false && selectedLink == "apiMan" ? (
            <ProjectsComponet />
          ) : selectedLink === "messages" && isSidebarCollapsed === false ? (
            <ChannelComponent />
          ) : selectedLink === "settings" && isSidebarCollapsed === false ? (
            <SettingsSidebar />
          ) : (
            ""
          )}
        </Box>
        <SidebarIconWithRotation
          isOpen={isSidebarCollapsed} // Controls rotation
          showIcon={
            cachedSidebarMenuIdCookie ||
            (selectedLink != "trace" &&
              selectedLink != "dashboard" &&
              selectedLink != "apiMan")
          } // Controls display
          onClick={toggleSidebar}
        />
      </SidebarMenu>
    </Box>
  );
}

export default SidebarComponent;
