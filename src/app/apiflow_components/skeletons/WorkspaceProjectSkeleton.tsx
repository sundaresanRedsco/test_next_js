import React from "react";
import { Card, Box, Skeleton, Grid } from "@mui/material";

const WorkspaceProjectSkeleton = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={12}>
      <Card
        sx={{
          backgroundColor: "#241D35",
          padding: "15px 20px",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingY: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={60}
                height={60}
                sx={{ backgroundColor: "#00000052" }}
              />
              <Box sx={{ marginLeft: "1rem" }}>
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  sx={{ backgroundColor: "#00000052" }}
                />
                <Skeleton
                  variant="text"
                  width={70}
                  height={15}
                  sx={{ backgroundColor: "#00000052", marginTop: "5px" }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={38}
                height={38}
                sx={{ backgroundColor: "#00000052", marginRight: "1rem" }}
              />
              <Skeleton
                variant="circular"
                width={38}
                height={38}
                sx={{ backgroundColor: "#00000052" }}
              />
            </Box>
          </Box>
          {/* Separator Line */}
          <Box
            sx={{
              borderBottom: "1px solid #F3F3F340",
              margin: "5px 0",
            }}
          />
        </Box>
      </Card>
    </Grid>
  </Grid>
);

export default WorkspaceProjectSkeleton;
