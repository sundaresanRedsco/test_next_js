import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Box, Typography, Grid, Card } from "@mui/material";
import { styled } from "@mui/system";

const BackgroundContainer = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  background: #1c1818a3;
  border-radius: 10px;
  padding: 10px 0px;
`;

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const CardTypography = styled("span")`
  font-family: "FiraSans-Regular" !important;
  color: #ffffffbf;
  font-size: 10px;
  margin-left: 3px;
`;

const DotTypography = styled("div")`
  border-radius: 50%;
  height: 8px;
  width: 8px;

`;

// Modified data to match the single metric per time slot shown in your image
const data = [
  { name: "10 AM", risk: 48 },
  { name: "7 PM", compliance: 30 },
  { name: "12 PM", frequentChanges: 25 },
  { name: "12 PM", recentMessages: 40 },
];

interface ProjectData {
  title: string;
  dataValue: number;
  percentageChange: number;
  dotColor: string;
}

interface GlobalGraphDataProps {
  projectData: ProjectData[];
  projectName: string;
}

const GlobalGraphData: React.FC<GlobalGraphDataProps> = ({
  projectData,
  projectName,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1A1A1A",
        borderRadius: "20px",
        border: "solid 1px #FFFFFF40",
        color: "#FFFFFF",
        padding: "10px",
        height: projectData?.length === 0 ? "200px" : "auto",
        display: projectData?.length === 0 ? "flex" : "block",
        justifyContent: projectData?.length === 0 ? "center" : "unset",
        alignItems: projectData?.length === 0 ? "center" : "unset",
        textAlign: projectData?.length === 0 ? "center" : "left",
      }}
    >
      <HeadingTypography style={{ fontSize: "15px" }}>
        {projectData?.length === 0 ? "" : projectName}
      </HeadingTypography>

      {projectData?.length === 0 ? (
        <HeadingTypography style={{ textAlign: "center",fontWeight:"200",fontSize:"14px" }}>
          No Data Found
        </HeadingTypography>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {projectData.map((project, index) => (
              <Grid
                item
                xs={6}
                key={index}
                sx={{ paddingTop: "10px !important" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DotTypography sx={{ backgroundColor: project.dotColor }} />
                  <CardTypography>{project.title}</CardTypography>
                </Box>
                <HeadingTypography style={{ fontSize: "18px" }}>
                  {project.dataValue}
                  <span style={{ fontSize: "9px", marginLeft:"5px" }}> ▲</span>
                  <CardTypography> {project.percentageChange}%</CardTypography>
                </HeadingTypography>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 2 }}>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={data} barSize={30}>
                <XAxis dataKey="name" stroke="#FFFFFF" tickLine={false} />
                <YAxis stroke="#FFFFFF" tickLine={false} axisLine={false} />
                <Bar dataKey="risk" fill="#FFCA28" radius={[10, 10, 0, 0]} />
                <Bar
                  dataKey="compliance"
                  fill="#4DD0E1"
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey="frequentChanges"
                  fill="#66BB6A"
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey="recentMessages"
                  fill="#E53935"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Card>
  );
};

export default GlobalGraphData;
