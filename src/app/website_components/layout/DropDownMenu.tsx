import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { Button, Typography } from "@mui/material";
import { MenuItem } from "./TopBar";

interface DropDownMenuProps {
  data: MenuItem;
}
export default function DropDownMenu({ data }: DropDownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? data.name : undefined;

  return (
    <Box
      sx={{
        cursor: "pointer",
        "&:hover": {
          color: "#cabeff",
          transition: "color 0.3s ease",
        },
        color: "#e5e1ec",
      }}
    >
      <Button
        size="small"
        sx={{
          color: data.bg ? "white" : "#e5e1ec",
          paddingX: "20px",
          paddingY: "6px",
          "&:hover": {
            background: "",
          },
          background:
            "linear-gradient(90.09deg,#111a3c33 5.32%,#654eaf33 114.11%),linear-gradient(0deg,#efefef0a,#efefef0a),#1b233933",

          border: "1px solid #ffffff29",
          display: {
            xs: data?.sm ? "none" : "flex",
            sm: data?.sm ? "none" : "flex",
            md: "flex",
          },
          alignItems: "flex-end",
          justifyContent: "center",
          borderRadius: "8px",
          textTransform: "capitalize",
          marginRight: 1,
        }}
        aria-describedby={id}
        type="button"
        onMouseDown={handleClose}
        onMouseEnter={handleOpen}
      >
        {data.name}
      </Button>

      {/* <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box>
      </Popper> */}
    </Box>
  );
}
