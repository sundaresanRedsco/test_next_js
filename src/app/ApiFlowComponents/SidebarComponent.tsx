"use client";
import { Box } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { getCookies, translate } from "../Helpers/helpersFunctions";
import {
  API_INTELLIGENCE_DASHBOARD_PATH,
  API_MANAGEMENT_DASHBOARD_PATH,
  API_RISK_DASHBOARD_PATH,
  API_TESTING_DASHBOARD_PATH,
  MANAGE_TEAM_DASHBOARD_PATH,
  SETTINGS_PROFILE_PATH,
} from "../Utilities/pathConstants";
import { useDispatch, useSelector } from "react-redux";
import store, { RootStateType } from "../Redux/store";
import {
  CommonReducer,
  resetGatewayStateCommon,
  updateTheme,
} from "../Redux/commonReducer";
import Cookies from "js-cookie";
import NounV2Manual from "../Assests/icons/v2noun-manualu.svg";
import NounV2Settings from "../Assests/icons/v2noun-setting.svg";
import NounV2Support from "../Assests/icons/v2noun-support.svg";

import NounV2Menu from "../Assests/icons/v2noun-menu.svg";
import NounV2Chat from "../Assests/icons/v2noun-chat.svg";
import NounV2Integration from "../Assests/icons/v2noun-integration.svg";
import DarkThemeV2Icon from "../Assests/icons/v2DarkThemeIcon.svg";
import NounV2VideoPlay from "../Assests/icons/v2noun-video-play.svg";

// ./v2noun-video-play.svg
import { styled } from "@mui/system";
import WorkspaceInfoComponent from "./SidebarSubComponent/WorkspaceInfoComponent";
import { HeaderTextTypography } from "../Styles/signInUp";
import theme from "../../Theme/theme";
import MessageSidebar from "./ApiManagements/MessageComponents/MessageSidebar";
import IntegrationInfoSidebar from "./ApiManagements/IntegrationInformationComponent/IntegrationInfoSidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { resetGatewayStateProject } from "../Redux/apiManagement/projectReducer";
import { resetGatewayStateApiGateway } from "../Redux/apiManagement/apiGatewayReducer";
import { resetGatewayStateFlow } from "../Redux/apiManagement/flowReducer";
import { resetGatewayStateSwaggerDoc } from "../Redux/apiManagement/swaggerDocReducer";
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
import { usePathname, useRouter } from "next/navigation";
import GlobalCircularLoader from "./Global/GlobalCircularLoader";
import dynamic from "next/dynamic";
import { signIn, signOut } from "next-auth/react";
import resetReducer from "../Redux/resetReducer";
import { resetSwaggerState } from "../Redux/apiManagement/endpointReducer";
import { resetGatewaySensibleMetrics } from "../Redux/apiRisk/sensibleMetricsReducer";
import { resetWorkspaceState } from "../Redux/apiManagement/workspaceReducer";
import { resetEnvironmentState } from "../Redux/apiManagement/environmentReducer";

const WorkspaceInfo = dynamic(
  () => import("./SidebarSubComponent/WorkspaceInfoComponent"),
  {
    loading: () => <GlobalCircularLoader open={true} />,
    ssr: false,
  }
);

const MessageBar = dynamic(
  () => import("./ApiManagements/MessageComponents/MessageSidebar"),
  {
    loading: () => <GlobalCircularLoader open={true} />,
    ssr: false,
  }
);

const IntegrationInfo = dynamic(
  () =>
    import(
      "./ApiManagements/IntegrationInformationComponent/IntegrationInfoSidebar"
    ),
  {
    loading: () => <GlobalCircularLoader open={true} />,
    ssr: false,
  }
);

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
}

const SidebarCon = styled(Box)<SidebarContainerProps>`
  background: ${({ theme }) => theme.palette.v2SidebarBg1Color.main};
  width: 40px; // Width based on 'expanded' prop

  /* Adjust width for larger screens */
  @media (min-width: 1440px) {
    width: 76px;
  }

  /* Adjust width for smaller screens */
  @media (max-width: 768px) {
    .element {
      width: 25px; /* Adjust as needed for smaller screens */
    }
  }

  /* Adjust width for even smaller screens */
  @media (max-width: 480px) {
    .element {
      width: 20px; /* Adjust as needed for very small screens */
    }
  }

  padding-top: 1px;
  font-family: Inter-Regular !important;

  overflow-x: hidden;
  overflow-y: hidden;
  transition: "width 0.3s linear", @media (min-width: 1440px) {
    width: 76px; // Adjust width for larger screens
  }

  &::-webkit-scrollbar {
    width: 5px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Thumb color */
    border-radius: 10px; /* Radius of the thumb */
  }

  @media (min-width: 1440px) {
    width: 40px; // Adjust width for larger screens
  }
`;

const SidebarMenu = styled(Box)<SidebarMenuProps>`
  width: 200px;
  background-color: ${({ theme }) => theme.palette.v2SidebarBg2Color.main};
  height: 100vh;
  padding: 20px 13px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1px; // Adjust the width of the scrollbar
  }

  &::-webkit-scrollbar-track {
    background-color: #f6f9ff; // Color of the scrollbar track
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; // Color of the scrollbar thumb
    border-radius: 10px; // Optional: make it rounded
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #f6f9ff; // Color of the scrollbar thumb on hover
  }
`;

const SubMenuItem = styled(Box)<SubMenuItemProps>`
  /* Regular styles for SubMenuItem */
  cursor: pointer;
  text-align: center;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  stroke: ${({ theme }) => theme.palette.v2SidebarIconColor.main};

  // svg {
  //   width: 2rem;
  //   height: 2rem;
  // }

  /* Conditional styles for active SubMenuItem */
  ${({ active, theme }) =>
    active &&
    `
    stroke: ${theme.palette.v2SidebarIconActiveColor.main};
    background: ${theme.palette.v2SidebarBg2Color.main};
    padding: 5;
    svg {
      fill: ${theme.palette.v2SidebarIconActiveColor.main};
      font-family: Inter-Regular !important;
    }
  `}

  /* Media query for a specific screen size (e.g., max-width: 768px) */
  @media (min-width: 1440px) {
    height: auto;
    svg {
      width: 1.8rem;
      height: 1.8rem;
      font-family: Inter-Regular !important;
    }
  }

  /* Adjust height and icon size for smaller screens */
  @media (max-width: 768px) {
    height: 40px;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    height: 35px;
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const SidebarComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  // const navigate = useNavigate();

  const { userProfile, themeValue } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const wsid = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  const [selectedLink, setSelectedLink] = useState<any>("apiMan");
  const [themeVal, setThemeVal] = useState(themeValue);

  const paths = [
    {
      label: `${translate("apiManagementSidebar.API_MANAGEMENT")}`,
      path:
        API_MANAGEMENT_DASHBOARD_PATH +
        "userId/" +
        userProfile?.user?.user_id +
        "/workspaceId/" +
        wsid,
      id: "apiMan",
      icon: (
        <NounV2Menu
        // style={{
        //   width: "100%",
        //   height: "100%",
        // }}
        />
      ),
    },
    {
      label: "API Risk",
      path:
        "/userId/" +
        userProfile?.user?.user_id +
        "/workspaceId/" +
        wsid +
        API_RISK_DASHBOARD_PATH,
      id: "apiRisk",
      icon: (
        <NounV2Chat
        // style={{
        //   width: "100%",
        //   height: "100%",
        // }}
        />
      ),
    },

    {
      label: "API Intelligence",
      path:
        "/userId/" +
        userProfile?.user?.user_id +
        "/workspaceId/" +
        wsid +
        API_INTELLIGENCE_DASHBOARD_PATH,
      id: "ApiIn",
      icon: (
        <NounV2Integration
        // style={{
        //   width: "100%",
        //   height: "100%",
        // }}
        />
      ),
    },
    {
      label: "Theme",
      path: "",
      // id: selectedLink,
      id: "theme",
      icon: (
        <DarkThemeV2Icon
        // style={{
        //   width: "100%",
        //   height: "100%",
        // }}
        />
      ),
    },
    // {
    //   label: "API Testing",
    //   path:
    //     "/userId/" +
    //     userProfile?.user?.user_id +
    //     "/workspaceId/" +
    //     wsid +
    //     API_TESTING_DASHBOARD_PATH,
    //   id: "ApiTest",
    //   icon: (
    //     <NounV2VideoPlay
    //       // style={{
    //       //   width: "100%",
    //       //   height: "100%",
    //       // }}
    //     />
    //   ),
    // },
    // {
    //   label: "Manage Team",
    //   path:
    //     "/userId/" +
    //     userProfile?.user?.user_id +
    //     "/workspaceId/" +
    //     wsid +
    //     MANAGE_TEAM_DASHBOARD_PATH,
    //   id: "manageTeam",
    //   icon: (
    //     <NounV2Support
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     />
    //   ),
    // },
    // {
    //   label: `${translate("settings.SETTINGS")}`,
    //   path:
    //     "/userId/" +
    //     userProfile?.user?.user_id +
    //     "/workspaceId/" +
    //     wsid +
    //     SETTINGS_PROFILE_PATH,
    //   id: "settings",
    //   icon: (
    //     <NounV2Settings
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     />
    //   ),
    // },
    // {
    //   label: `Manual`,
    //   path:
    //     "/userId/" +
    //     userProfile?.user?.user_id +
    //     "/workspaceId/" +
    //     wsid +
    //     SETTINGS_PROFILE_PATH,
    //   id: "manual",
    //   icon: (
    //     <NounV2Manual
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     />
    //   ),
    // },
    {
      label: "Logout",
      path: "",
      // id: selectedLink,
      id: "logout",
      icon: (
        <LogoutOutlinedIcon
          style={{
            color: `${theme.palette.v2PrimaryColor.main}`,
            width: "1rem",
            height: "1rem",
          }}
        />
      ),
    },
  ];

  const [sidebarLinks, setSidebarLinks] = useState<any>(paths);

  console.log(selectedLink, "selectedLinksdsds");

  const deleteAllCookies = () => {
    // Get all cookies
    const allCookies = Cookies.get();

    // Loop through all cookies and remove them
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  const handleLinkHover = (id: any) => {
    console.log(id, "Linkid");
    if (id === "theme") {
      if (themeVal === "light") {
        setThemeVal("dark");
        dispatch(updateTheme("dark"));
      } else {
        setThemeVal("light");
        dispatch(updateTheme("light"));
      }
    } else if (id === "logout") {
      handleLogout();
    } else {
      setSelectedLink(id);
      sessionStorage.setItem("path-id", id);
    }
  };

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
      console.log("LOgoutRes: ", res);
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
      }
    });

    // you may also want to redirect to the login page or perform other actions
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* SidebarIconsList */}
      <SidebarCon
        className="p-0"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%", // Ensure full height usage
        }}
      >
        {/* Top section with the first 3 icons */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {sidebarLinks?.slice(0, 3).map((link: any) => (
            <SubMenuItem
              key={link?.id}
              onClick={() => handleLinkHover(link?.id)}
              active={link?.id === selectedLink}
              data-test={link?.id}
            >
              <div style={{ height: "30px", width: "30px" }}>{link?.icon}</div>
            </SubMenuItem>
          ))}
        </div>

        {/* Bottom section with the next 4 icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {sidebarLinks?.slice(3).map((link: any) => (
            <SubMenuItem
              key={link?.id}
              onClick={
                () =>
                  // {
                  handleLinkHover(link?.id)
                // }
              }
              active={link?.id === selectedLink}
              data-test={link?.id}
            >
              <div style={{ width: "30px", height: "30px" }}>{link?.icon}</div>
            </SubMenuItem>
          ))}
        </div>
      </SidebarCon>

      {/* Sidebar Items */}
      <SidebarMenu>
        <HeaderTextTypography
          style={{ fontSize: "13px", fontFamily: "Inter-Medium" }}
        >
          {selectedLink === "apiMan"
            ? "Workspace Information"
            : selectedLink === "apiRisk"
            ? "Messages"
            : selectedLink === "ApiIn"
            ? "Integration Information"
            : ""}
        </HeaderTextTypography>
        <Box>
          {selectedLink === "apiMan" ? (
            <WorkspaceInfo />
          ) : selectedLink === "apiRisk" ? (
            <MessageBar />
          ) : selectedLink === "ApiIn" ? (
            <IntegrationInfo />
          ) : (
            ""
          )}
        </Box>
      </SidebarMenu>
    </Box>
  );
};

export default SidebarComponent;
