import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
  Grid2,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AwsCardIcon,
  AzureCardIcon,
  DeleteEnvironment,
  EditEnvironment,
  GcpCarIcon,
  ProjectCardIcon,
} from "@/app/Assests/icons";
import { styled } from "@mui/system";
import { PrimaryTypography } from "@/app/Styles/signInUp";

export interface GlobalIntegartionDataProps {
  data: any[];
}

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-regular !important;
  color: #ffffff80;
  font-size: 0.8rem;
  // margin-top: 0.7rem;
  font-weight: 400;
`;

const TextTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  color: white;
  font-size: 1rem;
  margin-top: 0.7rem;
  font-weight: 600;
`;

const GlobalIntegartionData: React.FC<GlobalIntegartionDataProps> = ({
  data,
}) => {
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
                    {item?.project_type === "AWS" ? (
                      <AwsCardIcon />
                    ) : item?.project_type === "GCP" ? (
                      <GcpCarIcon />
                    ) : item?.project_type === "AZURE" ? (
                      <AzureCardIcon />
                    ) : item?.project_type === "PROJET" ? (
                      <ProjectCardIcon />
                    ) : (
                      ""
                    )}

                    {/* Text Content */}
                    <Box sx={{ marginLeft: "1rem" }}>
                      <TextTypography>
                        {item?.project_type} {item?.name}
                      </TextTypography>
                      <HeadingTypography>
                        {/* {item?.secondaryTitle} */}
                        CMP Project
                      </HeadingTypography>
                      {/* {type} */}
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
                      <EditEnvironment />
                      <span style={{ marginLeft: "1rem" }}>
                        {" "}
                        <DeleteEnvironment />
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

export default GlobalIntegartionData;
