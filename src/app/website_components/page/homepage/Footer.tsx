import { Box, Typography } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Props = {};

export default function Footer({}: Props) {
  const footerList = [
    {
      id: 2,
      name: "Terms",
    },
    {
      id: 3,
      name: "Privacy",
    },
    {
      id: 4,
      name: "",
    },
    // {
    //   id: 5,
    //   name: "English",
    //   startIcon: <LanguageIcon sx={{ fontSize: "16px" }} />,
    //   endIcon: <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />,
    // },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }, // Stack on smaller screens
        alignItems: { xs: "start", md: "start", sm: "start", lg: "start" },
        justifyContent: "space-between",
        padding: "10px", // Optional padding
        marginBottom: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", sm: "row" },
          alignItems: { xs: "start", md: "start", sm: "center", lg: "center" },
          marginBottom: { xs: "10px", md: "0" }, // Margin for spacing on smaller screens
        }}
      >
        <Typography
          sx={{
            color: "#a9acac",
            fontSize: "14px",
            lineHeight: "20px",
            marginLeft: "0px",
          }}
        >
          © 2024 Api Trail.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
            sm: "row",
            lg: "row",
            xl: "row",
          }, // Stack items on smaller screens
          alignItems: {
            xs: "flex-start",
            sm: "center",
            md: "center",
            lg: "center",
            xl: "center",
          }, // Align items based on screen size
          justifyContent: "space-between",
          gap: { xs: "0", sm: "10px", md: "0", lg: "0", xl: "0" },
        }}
      >
        {footerList.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: { xs: "0", md: "16px" }, // Remove margin on smaller screens
              marginBottom: { xs: "8px", md: "0" }, // Add margin for vertical spacing on smaller screens
            }}
          >
            {item.startIcon && (
              <Box
                sx={{
                  color: "#a9acac",
                  marginRight: "3px",
                }}
              >
                {item.startIcon}
              </Box>
            )}
            <Typography
              sx={{
                color: "#a9acac",
                fontSize: "14px",
                lineHeight: "20px",
                // marginRight: item.icon ? "4px" : "0",
              }}
            >
              {item.name}
            </Typography>
            {item.endIcon && (
              <Box
                sx={{
                  color: "#a9acac",
                }}
              >
                {item.endIcon}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
