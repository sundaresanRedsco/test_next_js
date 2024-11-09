// src/components/CustomizedPopoverButton.tsx
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { theme } from "antd";
import filter from "../../Assests/images/filter.png";
import {
  ListsIcon,
  ShopIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "../../Assests/icons";
import { translate } from "../../Helpers/helpersFunctions";
import Image from "next/image";
import { Box } from "@mui/material";

const ProfilePopup = (props: any) => {
  const { open1, anchorEl2, handleClose1 } = props;

  const [Value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Popover
        open={open1}
        anchorEl={anchorEl2}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: "350px",
            height: "400px", // Customize the width
            top: "100px",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontFamily: "Inter-regular", fontSize: "0.7rem" }}>
              {translate("notification.NOTIFICATION")}
            </p>
            <div>
              <p style={{ fontFamily: "Inter-regular", fontSize: "0.7rem" }}>
                {/* <img src={filter} style={{ marginRight: "10px" }}></img> */}
                <Image src={filter} alt="" style={{ marginRight: "10px" }} />
                {/* {translate("notification.NOTIFICATION_SETTINGS")} */}
              </p>
            </div>
          </div>
        </Box>
        <ThemeProvider theme={theme}>
          <Tabs
            value={Value}
            onChange={handleChange}
            sx={{ textAlign: "center" }}
          >
            <Tab
              label="Direct (0)"
              sx={{
                fontWeight: "700",
                color: "#343a40",
                fontFamily: "Inter-regular",
                fontSize: "0.7rem",
              }}
              className="col"
            />
            <Tab
              label="Watching (0)"
              sx={{
                fontWeight: "700",
                color: "#343a40",
                fontFamily: "Inter-regular",
                fontSize: "0.7rem",
              }}
              className="col"
            />
            <Tab
              label="All (0)"
              sx={{
                fontWeight: "700",
                color: "#343a40",
                fontFamily: "Inter-regular",
                fontSize: "0.7rem",
              }}
              className="col"
            />
          </Tabs>
        </ThemeProvider>

        <div style={{ textAlign: "center", marginTop: "6rem" }}>
          <div>
            <ListsIcon />
          </div>
          <p
            style={{
              fontFamily: "Inter-regular",
              fontSize: "0.6rem",
              marginBottom: "8px",
            }}
          >
            {translate("notification.NOTIFICATION_CONTENT1")}
          </p>
          <p style={{ fontFamily: "Inter-regular", fontSize: "0.6rem" }}>
            {translate("notification.NOTIFICATION_CONTENT2")}
          </p>
        </div>
      </Popover>
    </div>
  );
};

export default ProfilePopup;
