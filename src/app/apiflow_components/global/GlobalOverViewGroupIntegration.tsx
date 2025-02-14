import React from "react";
import { Card, Typography, Box, Grid2 } from "@mui/material";

import { DeleteEnvironment, EditEnvironment } from "@/app/Assests/icons";
import { styled } from "@mui/system";
import { PrimaryTypography } from "@/app/Styles/signInUp";

export interface GlobalOverViewGroupIntegrationProps {
  data: any[];
}

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffffbf;
  font-size: 0.8rem;
  margin-top: 0.7rem;
`;

const TextTypography = styled(Typography)`
  font-family: FiraSans-semibold;
  color: white;
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const GlobalOverViewGroupIntegration: React.FC<
  GlobalOverViewGroupIntegrationProps
> = ({ data }) => {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 12, sm: 12, xs: 12 }}>
          <Card
            sx={{
              backgroundColor: "#241D35", // Dark background
              padding: "15px 20px",
              borderRadius: "10px", // Rounded corners
              width: "100%",
            }}
          >
            {data.map((item: any, index: number) => (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        background: "#FFE8DA",
                        padding: "10px",
                        borderRadius: "20%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PrimaryTypography
                        style={{
                          color: "#121212BF",
                          fontWeight: 600,
                          fontSize: "10px",
                        }}
                      >
                        {item?.group_type}
                      </PrimaryTypography>
                    </Box>

                    {/* Text Content */}
                    <Box sx={{ marginLeft: "1rem", marginBottom: "15px" }}>
                      <TextTypography>
                        {item?.group_type} {item?.name}
                      </TextTypography>
                      <HeadingTypography>
                        {/* {item?.secondaryTitle} */}
                        CMP Project
                      </HeadingTypography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      {/* <EditEnvironment /> */}
                      <span style={{ marginLeft: "1rem" }}>
                        {" "}
                        {/* <DeleteEnvironment /> */}
                      </span>
                    </Box>
                  </Box>
                </Box>
                {/* Separator Line */}
                {index < data.length - 1 && (
                  <Box
                    sx={{
                      borderBottom: "1px solid #F3F3F340",
                      margin: "10px 0",
                    }}
                  />
                )}
              </Box>
            ))}
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default GlobalOverViewGroupIntegration;
