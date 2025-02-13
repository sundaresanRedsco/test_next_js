import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Collbrate,
  Enviroment,
  Integration,
  OverView,
  ProjectWork,
} from "@/app/Assests/icons";
import {
  PrimaryTextTypography,
  SecondaryTextTypography,
} from "@/app/Styles/signInUp";
import { color, styled } from "@mui/system";
import WorkspaceSelection from "./workspaceSelection";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { usePathname, useRouter } from "next/navigation";

const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-medium;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 15px;
`;

const workspaceData = [
  {
    id: "overview",
    icon: <OverView />,
    text: "Overview",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/overview$/,
  },
  {
    id: "projects",
    icon: <ProjectWork />,
    text: "Projects",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/projects$/,
  },
  {
    id: "environments",
    icon: <Enviroment />,
    text: "Environments",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/environments$/,
  },
  {
    id: "integration",
    icon: <Integration />,
    text: "Integration",
    regex:
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings\/integration$/,
  },
];

function WorkspaceSettings() {
  const router = useRouter();
  const pathname = usePathname();
  const { maninContainer, userProfile } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );
  const [selectedLink, setSelectedLink] = useState<any>("overview");
  const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/settings`;
  const handleActive = (id: any) => {
    router.push(`${newUrl}/${id}`);
  };

  const avatarText = (val: string): string => {
    return val ? val?.substring(0, 3).toUpperCase() : "";
  };

  useEffect(() => {
    const activePath = workspaceData?.find((link) =>
      pathname.match(link.regex)
    );
    if (activePath) {
      setSelectedLink(activePath.id);
    }
  }, [pathname]);

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
          <PrimaryTypography
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // writingMode: "vertical-lr",
              textAlign: "center",
              margin: 0,
              fontSize: "0.6rem",
            }}
          >
            {/* CRF */}
            {avatarText(currentWorkspace?.name as string)}
          </PrimaryTypography>
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
        {currentWorkspace?.name}
      </PrimaryTypography>

      <Box style={{ margin: "1rem", marginRight: "0rem" }}>
        {workspaceData.map((workspace) => (
          <div key={workspace.id} style={{ marginBottom: "1rem" }}>
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
              onClick={() => {
                // Update selected link for active color
                setSelectedLink(workspace.id);

                if (
                  workspace.id !== "collaborators" &&
                  workspace.id !== "integration"
                ) {
                  handleActive(workspace.id);
                } else {
                }
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

export default WorkspaceSettings;
