import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Integration, OverView, ProjectWork } from "@/app/Assests/icons";
import { color, styled } from "@mui/system";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";

const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-medium;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 15px;
`;

const workspaceData = [
  {
    id: "profile",
    icon: <OverView />,
    text: "Profile",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/overview$/,
  },
  {
    id: "accountSetting",
    icon: <ProjectWork />,
    text: "Account Settings",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/projects$/,
  },
  {
    id: "integrations",
    icon: <Integration />,
    text: "Integrations",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/projects$/,
  },
];

function SettingsSidebar() {
  const { setIsPageLoading, isPageLoading } = useGlobalStore();
  const router = useRouter();
  const pathname = usePathname();
  const { maninContainer, userProfile } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );
  const [selectedLink, setSelectedLink] = useState<any>("profile");
  const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/settings`;
  const handleActive = (id: any) => {
    router.push(`${newUrl}/${id}`);
  };

  const avatarText = (val: string): string => {
    return val ? val?.substring(0, 3).toUpperCase() : "";
  };

  useEffect(() => {
    if (isPageLoading) {
      setIsPageLoading(false);
    }
    const activePaths = pathname.split("/");
    if (activePaths[4]) {
      setSelectedLink(activePaths[4]);
    } else {
      setSelectedLink("profile");
    }
  }, [pathname, isPageLoading]);

  return (
    <Box sx={{ marginTop: "0.7rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            height: "4rem",
            width: "4rem",
            borderRadius: "50%",
            backgroundColor: "#3F64FA",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userProfile?.user?.first_name && (
            <PrimaryTypography
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // writingMode: "vertical-lr",
                textAlign: "center",
                margin: 0,
                fontSize: "1.5rem",
              }}
            >
              {/* CRF */}
              {avatarText(userProfile?.user?.first_name[0] as string)}
            </PrimaryTypography>
          )}
        </Box>
      </div>

      <PrimaryTypography
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        {/* Carrefour Workspace */}
        {userProfile?.user?.first_name} {userProfile?.user?.last_name}
      </PrimaryTypography>

      <Box style={{ margin: "1rem", marginRight: "0rem" }}>
        {workspaceData.map((workspace) => (
          <div
            onClick={() => {
              setSelectedLink(workspace.id);
              if (workspace.id == "profile") {
                if (
                  pathname != `/userId/${userProfile?.user.user_id}/settings`
                ) {
                  setIsPageLoading(true);
                } else {
                  setIsPageLoading(false);
                }
                router.push(`/userId/${userProfile?.user.user_id}/settings`);
              } else {
                if (
                  pathname !=
                  `/userId/${userProfile?.user.user_id}/settings/${workspace.id}`
                ) {
                  setIsPageLoading(true);
                } else {
                  setIsPageLoading(false);
                }
                router.push(
                  `/userId/${userProfile?.user.user_id}/settings/${workspace.id}`
                );
              }
            }}
            key={workspace.id}
            style={{ marginBottom: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                background:
                  workspace?.id === selectedLink
                    ? "linear-gradient(90deg, #9B53B0 0%, rgba(122, 67, 254, 0.5) 100%)"
                    : "transparent",
                padding: "8px",
                cursor: "pointer",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                color: workspace?.id === selectedLink ? "#FFFFFF" : "#FFFFFF80",
              }}
            >
              <Box> {workspace.icon}</Box>
              <PrimaryTypography
                style={{
                  color: "#FFFFFF",
                  marginLeft: "0.8rem",
                  marginTop: "3px",
                  fontFamily:
                    workspace?.id === selectedLink
                      ? "Firasans-medium"
                      : "Firasans-regular",
                }}
              >
                {workspace.text}
              </PrimaryTypography>
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default SettingsSidebar;
