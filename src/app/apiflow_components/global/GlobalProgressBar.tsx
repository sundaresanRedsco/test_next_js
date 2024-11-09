// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   LinearProgress,
//   linearProgressClasses,
// } from "@mui/material";
// import { styled } from "@mui/system";

// const ProgressTypography = styled(Typography)`
//   font-family: "FiraSans-Regular" !important;
//   color: #ffffff;
//   font-size: 8px;
// `;

// const GlobalProgressBar = () => {
//   const segments = [
//     { label: "OWASP API9-35", color: "#55FF46", value: 20 },
//     { label: "Parameter Anomalies-35", color: "#00EAFF", value: 10 },
//     { label: "OWASP API1: BOLA 35", color: "#FF0304", value: 15 },
//     {
//       label: "OWASP API2: Broken Authentication-75",
//       color: "#FEBF00",
//       value: 25,
//     },
//     { label: "Blocked Geo-45", color: "#CE26FF", value: 10 },
//     { label: "OWASP API8: Injection-70", color: "#F5FF6A", value: 15 },
//     { label: "Others", color: "#6F6880", value: 5 },
//   ];

//   return (
//     <div>
//       {segments?.length === 0 ? (
//         ""
//       ) : (
//         <>
//           <Box sx={{ width: "100%", borderRadius: 1, marginTop: "1rem" }}>
//             {/* Legend */}
//             <Grid container spacing={1} sx={{ marginBottom: 1 }}>
//               {segments.map((segment, index) => (
//                 <Grid item key={index}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginLeft: "1rem",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         backgroundColor: segment.color,
//                         marginRight: 1,
//                         borderRadius: "50%",
//                       }}
//                     />
//                     <ProgressTypography>{segment.label}</ProgressTypography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Progress Bar */}
//             <Box
//               sx={{
//                 position: "relative",
//                 height: 10,
//                 borderRadius: 1,
//                 overflow: "hidden",
//                 backgroundColor: "#e0e0e0",
//               }}
//             >
//               {segments.map((segment, index) => {
//                 const width = `${segment.value}%`;
//                 const offset = `${segments
//                   .slice(0, index)
//                   .reduce((acc, seg) => acc + seg.value, 0)}%`;

//                 return (
//                   <Box
//                     key={index}
//                     sx={{
//                       position: "absolute",
//                       left: offset,
//                       width,
//                       height: "100%",
//                       backgroundColor: segment.color,
//                       borderRadius:
//                         index === segments.length - 1 ? "0px 4px 4px 0px" : "0", // only round the last segment
//                     }}
//                   >
//                     <LinearProgress
//                       variant="determinate"
//                       value={100}
//                       sx={{
//                         backgroundColor: segment.color,
//                         [`& .${linearProgressClasses.bar}`]: {
//                           backgroundColor: segment.color,
//                         },
//                         height: "100%",
//                       }}
//                     />
//                   </Box>
//                 );
//               })}
//             </Box>
//           </Box>
//         </>
//       )}
//     </div>
//   );
// };

// export default GlobalProgressBar;
import React from "react";
import { Box, Typography, Grid, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";

const ProgressTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 8px;
`;

const GlobalProgressBar = () => {
  const segments: any = []; // Empty array for testing "No data found" case

  return (
    <div>
      {segments.length === 0 ? (
        <Box sx={{ width: "100%", borderRadius: 1, marginTop: "1rem" }}>
          {/* "No Data Found" Legend Item */}
          <Grid container spacing={1} sx={{ marginBottom: 1 }}>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#6F6880", // Set to the default color
                    marginRight: 1,
                    borderRadius: "50%",
                  }}
                />
                <ProgressTypography style={{ fontSize: "10px" }}>
                  No data found
                </ProgressTypography>
              </Box>
            </Grid>
          </Grid>

          {/* White Progress Bar with Custom Color */}
          <Box
            sx={{
              position: "relative",
              height: 10,
              borderRadius: 1,
              overflow: "hidden",
              backgroundColor: "#e0e0e0",
            }}
          >
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: "100%",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#6F6880", // Custom color when no data
                },
                backgroundColor: "#6F6880", // Ensures full bar is this color
              }}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ width: "100%", borderRadius: 1, marginTop: "1rem" }}>
            {/* Legend */}
            <Grid container spacing={1} sx={{ marginBottom: 1 }}>
              {segments.map((segment: any, index: number) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "1rem",
                      marginBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: segment.color,
                        marginRight: 1,
                        borderRadius: "50%",
                      }}
                    />
                    <ProgressTypography>{segment.label}</ProgressTypography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Progress Bar */}
            <Box
              sx={{
                position: "relative",
                height: 10,
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#e0e0e0",
              }}
            >
              {segments.map((segment: any, index: number) => {
                const width = `${segment.value}%`;
                const offset = `${segments
                  .slice(0, index)
                  .reduce((acc: any, seg: any) => acc + seg.value, 0)}%`;

                return (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      left: offset,
                      width,
                      height: "100%",
                      backgroundColor: segment.color,
                      borderRadius:
                        index === segments.length - 1 ? "0px 4px 4px 0px" : "0",
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default GlobalProgressBar;
