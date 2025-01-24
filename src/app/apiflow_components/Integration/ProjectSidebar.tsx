import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const SideBarText = styled(Typography)`
  padding: 6px 8px;
  font-size: 0.5rem;
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
`;

function ProjectSideBar(props: any) {
  const { sidebarData, onClickHandler, active } = props;
  const theme = useTheme();
  return (
    <Box
      style={{
        width: "7%",
        backgroundColor: theme.palette.V2SecondSidebarBackground.main,
      }}
    >
      {sidebarData?.map((item: any) => (
        <Box
          key={item.id}
          onClick={() => onClickHandler(item?.id)}
          style={{
            marginBottom: "16px",
            marginTop: "0.3rem",
            cursor: "pointer",
            backgroundColor: active === item.id ? "#FFFFFF" : "transparent",
            color: active === item.id ? "#282F79" : "inherit",
            textAlign: "center",
          }}
        >
          {item.icon}
          <SideBarText
            style={{
              color:
                active === item.id ? "#282F79" : theme.palette.V2TextColor.main,
              fontWeight: "800",
            }}
          >
            {item.label}
          </SideBarText>
        </Box>
      ))}
    </Box>
  );
}

export default ProjectSideBar;
