import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid2";

type Props = {};

export default function FooterDetails({}: Props) {
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, sm: 9, md: 9, lg: 9, xl: 9 }}></Grid>
      </Grid>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
          padding: "4px",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "rgb(59 66 84 / 0.7)",
          },
        }}
      >
        <CheckCircleIcon
          sx={{
            color: "#10b981",
            fontSize: "15px",
            marginRight: "8px",
            border: "1.8px solid rgba(169, 169, 169, 0.6)",
            borderRadius: "50%",
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#fff",
          }}
        >
          All services are online
        </Typography>
      </Box>
      <Divider
        sx={{
          backgroundColor: "rgba(202, 190, 255, 0.16)",
          height: "1px",
          margin: "30px 0px 30px 0px",
        }}
      />
    </Box>
  );
}
