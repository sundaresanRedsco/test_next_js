import React from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { HeadingTypography, SecondaryTypography } from "../../Styles/signInUp";
import CustomIconButton from "./customIconButton";
import GChip from "../../Components/Global/GChip";
import GSelect from "../../Components/Global/GSelect";
import AvatarComponent from "./Avatar/avatarComponent";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Menu, MenuItem } from "@mui/material";

interface DesignerHeaderProps {
  apiFlowName: string;
  buttonConfig: Array<any>;

  flowVersions: Array<any>;
  versionValue: any;
  setVersionValue: (val: any) => void;
  isEditable: boolean;
  theme: any;
  userAction: string;
}

const DesignerHeader: React.FC<DesignerHeaderProps> = ({
  apiFlowName,
  buttonConfig,
  flowVersions,
  versionValue,
  setVersionValue,
  isEditable,
  theme,
  userAction,
}) => {


  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl2);
  const handleMenuClick = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMenuClose = () => {
    console.log("test");

    setAnchorEl2(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        padding: "1px",
        background: theme.palette.primaryWhite.main,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <HeadingTypography className="mx-2" style={{ fontSize: "10px" }}>
            {apiFlowName}
          </HeadingTypography>

          <GChip
            type="primary"
            color="white"
            label={isEditable ? "Edit Mode" : "View Mode"}
          />
        </div>
        {userAction && (
          <HeadingTypography style={{ fontSize: "10px" }}>
            {userAction}
          </HeadingTypography>
        )}

        <>
          <Stack direction={"row"} spacing={0.5}>
            {buttonConfig.map((config, index) => (
              <div>
                {config.dropDown === "true" && (
                  <CustomIconButton
                    key={index}
                    onClick={config.onClick}
                    ariaLabel={config.ariaLabel}
                    tooltipTitle={config.tooltipTitle}
                    IconComponent={config.IconComponent}
                    isActive={config.isActive}
                    disabled={config.disabled}
                    iconStyle={{
                      color: theme.palette.v2PrimaryColor.main,
                      fontWeight: 800,
                      fontSize: "12px",
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
                borderHeight="2rem"
                radius="4px"
                options={flowVersions?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
                value={versionValue}
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
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "0.7rem",
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
                  {buttonConfig.map((config, index) => (
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
                            <CustomIconButton
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

            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <AvatarComponent />
            </IconButton>
          </Stack>
        </>
      </div>
    </Box>
  );
};

export default DesignerHeader;
