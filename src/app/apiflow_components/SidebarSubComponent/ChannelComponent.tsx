// Imports at the top
import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { ChannelPlusIcon } from "@/app/Assests/icons";
import GlobalButton from "../global/GButton";

// Responsive Styled Typography Components
const PrimaryTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-bold",
  color: "#FFFFFF",
  lineHeight: "normal",
  fontSize: "0.8rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

const SecondaryTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-medium",
  color: "#FFFFFFA6",
  fontSize: "0.6rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.8rem",
  },
}));

// Main component
function ChannelComponent() {
  const router = useRouter();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const channelDatas = [
    {
      label: "Organization",
      onClick: undefined,
      icon: false,
      isDropDown: false,
      dropDownData: [],
    },
    {
      label: "Project",
      onClick: undefined,
      icon: false,
      isDropDown: false,
      dropDownData: [],
    },
    {
      label: "Personal",
      onClick: undefined,
      icon: (
        <ChannelPlusIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push(
              `/userId/${userProfile?.user?.user_id}/channel/createChannel`
            );
          }}
        />
      ),
      isDropDown: false,
      dropDownData: [],
    },
    {
      label: "External",
      onClick: undefined,
      icon: false,
      isDropDown: false,
      dropDownData: [],
    },
  ];
  return (
    <Box sx={{ color: "white" }}>
      <GlobalButton
        background="#FFFFFF1A"
        label="Channels"
        radius="0px"
        onClickHandler={() => {
          router.push(
            `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/channel`
          );
        }}
        fontSize="18px"
        width={"100%"}
        color="white"
        padding="12px auto"
        margin="0"
        fontFamily="Firasans-medium !important"
      />
      <Box sx={{ marginLeft: "10px" }}>
        {channelDatas?.map((elem, index) => {
          return (
            <Box
              key={index}
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "95%",
                }}
              >
                <SecondaryTextTypography
                  style={{
                    color: "#FFFFFF",
                    fontSize: "17px",
                  }}
                >
                  {elem?.label}
                </SecondaryTextTypography>
                {elem?.icon}
              </Box>
              {/* <SecondaryTextTypography>
            # Public Announcement
          </SecondaryTextTypography>
          <SecondaryTextTypography>
            # Workspace Announcement
          </SecondaryTextTypography>
          <SecondaryTextTypography>
            # Project Announcement
          </SecondaryTextTypography> */}
              {/* Project Section */}
              {/* <Box sx={{ marginTop: "30px" }}>
                <PrimaryTextTypography>Project</PrimaryTextTypography>
            
              </Box> */}

              {/* <Box sx={{ marginTop: "30px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <PrimaryTextTypography>Personals</PrimaryTextTypography>
                  <ChannelPlusIcon
                    style={{ margin: "10px", cursor: "pointer" }}
                    onClick={() => {
                      router.push(
                        `/userId/${userProfile?.user?.user_id}/channel/createChannel`
                      );
                    }}
                  />
                </Box>
              </Box> */}
              {/* <SecondaryTextTypography># My Team Channel</SecondaryTextTypography>
              {/* <SecondaryTextTypography># My Team Channel</SecondaryTextTypography>
          <SecondaryTextTypography># My Environment</SecondaryTextTypography> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default ChannelComponent;
