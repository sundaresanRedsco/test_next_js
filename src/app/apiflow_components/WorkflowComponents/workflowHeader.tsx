"use client";

import React from "react";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import GButton from "@/app/apiflow_components/global/GButton";
import { styled } from "@mui/system";
import { ArrowIcon } from "@/app/Assests/icons";
import WorkflowCustomIconButton from "@/app/apiflow_components/WorkflowComponents/workflowCustomIconButton";
import GSelect from "@/app/apiflow_components/global/GSelect";
import theme from "@/Theme/theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MaximizeV2 from "@/app/Assests/icons/maximize-image.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  PrimarySignInUPTypography,
  SecondaryTypography,
} from "@/app/Styles/signInUp";

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  font-weight: 200;
  wordwrap: break-word;
`;

interface DesignerHeaderProps {
  recentlyModifiedProp?: boolean;
  apiFlowName?: string;
  buttonConfig?: Array<any>;
  flowVersions?: Array<any>;
  versionValue?: any;
  setVersionValue?: any;
  isEditable?: boolean;
  theme?: any;
  userAction?: string;
}

export default function WorkflowHeader(props: DesignerHeaderProps) {
  const {
    recentlyModifiedProp,
    apiFlowName,
    buttonConfig,
    flowVersions,
    versionValue,
    setVersionValue,
    isEditable,
    theme,
    userAction,
  } = props;

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl2);
  const handleMenuClick = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMenuClose = () => {
    console.log("test");

    setAnchorEl2(null);
  };

  // const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        // position: "relative",
        // zIndex: 9999999,
        // width: "100%",
        // height: "20%",
        // background: "rgba(243, 243, 243, 0.25)", // Transparent background
        // backdropFilter: "blur(4.76914px)", // Backdrop blur
        background: "#F3F3F340",
        backdropFilter: "blur(9.54)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          xs: "0px 10px",
          sm: "0px 10px",
          md: "0px 10px",
          // md: recentlyModifiedProp ? "5px" : "8px",
          lg: "0px 10px",
          xl: "5px 10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: {
            xs: "5px",
            sx: "5px",
            md: "10px",
            lg: recentlyModifiedProp === true ? "5px" : "10px",
            xl: recentlyModifiedProp === true ? "5px" : "10px",
          },
          marginLeft: "10px",
        }}
      >
        <PrimarySignInUPTypography
          sx={{
            color: "#EEEEEE",
            fontSize: {
              xs: "12px",
              sm: "12px",
              md: "13px",
              lg: recentlyModifiedProp === true ? "8px" : "13px",
              xl: recentlyModifiedProp === true ? "8px" : "18px",
            },
          }}
        >
          {apiFlowName}
          {/* V2New */}
        </PrimarySignInUPTypography>

        <GButton
          buttonType="primary"
          label={isEditable ? "Edit Mode" : "View Mode"}
          width="100%"
          fontSize={{
            xs: "10px",
            sm: "10px",
            md: "14px",
            lg: recentlyModifiedProp === true ? "6px" : "14px",
            xl: recentlyModifiedProp === true ? "6px" : "15px",
          }}
          radius={"8px"}
          padding="3px"
        />
        {userAction && (
          <HeadingTypography style={{ fontSize: "10px" }}>
            {userAction}
          </HeadingTypography>
        )}

        <Box
          sx={{
            width: {
              xs: "30px",
              sx: "30px",
              md: "40px",
              lg: recentlyModifiedProp === true ? "20px" : "40px",
              xl: recentlyModifiedProp === true ? "20px" : "40px",
            },
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaximizeV2 />
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={{
          xs: 0,
          sm: 0,
          md: 0,
          lg: recentlyModifiedProp === true ? 0 : 1,
          xl: recentlyModifiedProp === true ? 0 : 1,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {buttonConfig?.map((config, index) => (
          <div key={index}>
            {config.dropDown === "true" && (
              <WorkflowCustomIconButton
                key={index}
                onClick={config.onClick}
                ariaLabel={config.ariaLabel}
                tooltipTitle={config.tooltipTitle}
                IconComponent={config.IconComponent}
                isActive={config.isActive}
                disabled={config.disabled}
                iconStyle={{
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: recentlyModifiedProp === true ? "10px" : "20px",
                }}
                badgeContent={config.badgeContent}
                sx={config.sx}
              />
            )}
          </div>
        ))}
        <div>
          <GSelect
            fullWidth={false}
            fontSize="10px"
            size={"small"}
            borderHeight={"2rem"}
            radius="4px"
            width={recentlyModifiedProp === true ? "60px" : "70px"}
            options={flowVersions?.map((x) => ({
              label: x.name,
              value: x.id,
            }))}
            value={versionValue}
            iconPosition="end"
            icon={
              <KeyboardArrowDownIcon
                sx={{
                  color: "#EEEEEE",
                  fontSize: "10px",
                  fontWeight: "800",
                }}
              />
            }
            onChange={(val: any) => {
              setVersionValue(val);
            }}
          />
        </div>

        <div>
          <div
            style={{ padding: "0px" }}
            id="basic-button"
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreVertIcon
              style={{
                fontSize: recentlyModifiedProp === true ? "15px" : "20px",
                cursor: "pointer",
                // marginLeft: "10px",
                color: "#FFFFFF",
                fontWeight: "800",
                alignItems: "center",
              }}
            />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open1}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ width: "auto", height: "auto", padding: "5px" }}
          >
            <Box
              sx={{
                li: {
                  fontFamily: "Inter-Regular",
                  fontSize: "0.6rem",
                  fontWeight: "600",
                  textAlign: "start",
                  svg: {
                    width: "1rem",
                    height: "1rem",
                  },
                },
              }}
            >
              {buttonConfig?.map((config, index) => (
                <div>
                  {config.dropDown === "false" && (
                    <div
                      onClick={() => {
                        if (!config.disabled) {
                          config.onClick();
                        }
                      }}
                    >
                      <MenuItem disabled={config.disabled}>
                        {/* {config.IconComponent} */}
                        <WorkflowCustomIconButton
                          IconComponent={config.IconComponent}
                          disabled={config.disabled}
                          ariaLabel={""}
                          tooltipTitle={""}
                        />
                        <SecondaryTypography>
                          {config.tooltipTitle}
                        </SecondaryTypography>
                      </MenuItem>
                    </div>
                  )}
                </div>
              ))}
            </Box>
          </Menu>
        </div>
      </Stack>
    </Box>
  );
}
