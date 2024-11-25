// import { Typography } from "@mui/material";
// import { Box, styled } from "@mui/system";
// import { PlusIcon, PostManIcon, SwaggerIcon } from "../../Assests/icons";
// import theme from "../../../Theme/theme";
// import GsearchBar from "../Global/GsearchBar";
// import React, { useState } from "react";
// import Chart from 'chart.js/auto';

// import { Grid } from "@mui/material";
// import path1 from "../../Assests/images/path1.png";
// import CircleIcon from "@mui/icons-material/Circle";
// import { translate } from "../../Helpers/helpersFunctions";
// import { DatePicker, Space } from "antd";

// import GSelect from "../Global/GSelect";
// import { useSelector } from "react-redux";
// import { RootStateType } from "../../Redux/store";
// import { senstiveDataReducer } from "../../Redux/apiRisk/senstiveDataReducer";
// import dayjs from "dayjs";
// // import { Grid } from "antd";

// const ChartTextTypography = styled(Typography)`
//   color: ${({ theme }) => theme.palette.primaryText.main};
//   font-family: Inter-Regular;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   margin-right: 10px;
// `;

// const ChartTextTypography1 = styled(Typography)`
//   color: ${({ theme }) => theme.palette.primaryText.main};
//   font-family: Inter-Regular;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
//   margin-right: 10px;
//   font-size: 0.625rem;
// `;

// const { RangePicker } = DatePicker;

// export default function SensitiveDatachart() {
//   const chartRef = React.useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = React.useRef<any>(null);

//   const { senstivedatatypesgraph } = useSelector<
//     RootStateType,
//     senstiveDataReducer
//   >((state) => state.apiRisk.senstivedata);
//   console.log("graph1", senstivedatatypesgraph);

//   const [vulnerTypes, setVulnerTypes] = useState<any>([]);

//   React.useEffect(() => {
//     // Data for the doughnut chart
//     const data = {
//       // labels: ["Low", "Medium", "High", "Critical","Champion","Sixth","seventh","Eighth","Nineth","Tenth"],
//       datasets: [
//         {
//           label: "My Doughnut Dataset",
//           data: [100, 100, 1400, 100, 50, 100, 100, 100, 100, 100],
//           backgroundColor: [
//             "#FFE565",
//             "#FDA556",
//             "#22C55E",
//             "#791C83",
//             "#7f1d1d",
//             "#FD5039",
//             "#0d1e36",
//             "#aba8a8",
//             "#0d6efd",
//             "#295a43",
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };

//     // Chart configuration
//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//     };

//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     // Create the doughnut chart
//     const ctx: any = chartRef?.current?.getContext("2d");
//     if (chartRef.current) {
//       chartInstanceRef.current = new Chart(ctx, {
//         type: "doughnut",
//         data: data,
//         options: options,
//       });
//     }

//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, []);

//   React.useEffect(() => {
//     setVulnerTypes(senstivedatatypesgraph[0]?.vulnerabilityTypes);
//   }, [senstivedatatypesgraph]);

//   console.log("st", vulnerTypes);

//   return (
//     <section className="sensitvedatachart">
//       <Box className="d-flex justify-content-between">
//         <Box className="col-md-4">
//           {/* <GSelect
//               fullWidth={true}
//               variant="strandard"
//               defaultValue={"daily"}
//               options={[
//                 { value: "daily", label: "Daily" },
//                 { value: "weekly", label: "Weekly" },
//                 { value: "monthly", label: "Monthly" },
//                 { value: "yearly", label: "Yearly" },
//               ]}
//             /> */}
//           <div style={{ marginBottom: "20px" }}>
//             {/* <Space direction="vertical" size={12}>
//                 <RangePicker
//                   style={{ width:'220px'}}
//                   separator={'-'}
//                   hideDisabledOptions
//                   defaultValue={[dayjs('2023-12-29'), dayjs('2024-01-04')]}
//                   format={"MMM DD, YYYY"}
//                   clearIcon={false}
//                 />
//               </Space> */}
//           </div>
//         </Box>
//         {/* <Box className="col-md-2">
//           <GSelect
//             fullWidth={true}
//             variant="strandard"
//             defaultValue={"daily"}
//             options={[
//               { value: "daily", label: `${translate("apiManagement.DAILY")}` },
//               {
//                 value: "weekly",
//                 label: `${translate("apiManagement.WEEKLY")}`,
//               },
//               {
//                 value: "monthly",
//                 label: `${translate("apiManagement.MONTHLY")}`,
//               },
//               {
//                 value: "yearly",
//                 label: `${translate("apiManagement.YEARLY")}`,
//               },
//             ]}
//           />
//         </Box> */}
//       </Box>
//       <Box>
//         <Box
//           className="p-1"
//           sx={{
//             height: 550,
//             // boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
//             borderRadius: "2px",
//           }}
//         >
//           <Grid container>
//             <canvas id="myDoughnutChart" ref={chartRef}></canvas>
//           </Grid>
//           <div>
//             <span style={{ display: "flex" }}>
//               <div style={{ color: "gray" }}>
//                 <ul>
//                   <li style={{ fontSize: "0.6rem" }}>
//                     legacydataset-obfusted{" "}
//                     <span
//                       style={{
//                         color: "black",
//                         fontWeight: "600",
//                         marginLeft: "10px",
//                         fontSize: "0.6rem",
//                       }}
//                     >
//                       256
//                     </span>
//                   </li>
//                   <span>
//                     <li style={{ fontSize: "0.6rem" }}>
//                       Legalegacydataset redacted{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         33
//                       </span>
//                     </li>
//                     <li style={{ fontSize: "0.6rem" }}>
//                       Internal Tracable Agent instrumantation Tokens{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         11
//                       </span>
//                     </li>
//                     <li style={{ fontSize: "0.6rem" }}>
//                       Azure Auth{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         9
//                       </span>
//                     </li>{" "}
//                     <li style={{ fontSize: "0.6rem" }}>
//                       Generic Auth{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         9
//                       </span>
//                     </li>
//                   </span>
//                 </ul>
//               </div>

//               <div style={{ color: "gray" }}>
//                 <ul>
//                   <li style={{ fontSize: "0.6rem" }}>
//                     General Personal info{" "}
//                     <span
//                       style={{
//                         color: "black",
//                         fontWeight: "600",
//                         marginLeft: "10px",
//                         fontSize: "0.6rem",
//                       }}
//                     >
//                       41
//                     </span>
//                   </li>
//                   <span>
//                     <li style={{ fontSize: "0.6rem" }}>
//                       PCI DSS(in scope){" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         9
//                       </span>
//                     </li>{" "}
//                     <li style={{ fontSize: "0.6rem" }}>
//                       AWS Auth{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         9
//                       </span>
//                     </li>
//                     <li style={{ fontSize: "0.6rem" }}>
//                       GCP Auth{" "}
//                       <span
//                         style={{
//                           color: "black",
//                           fontWeight: "600",
//                           marginLeft: "10px",
//                           fontSize: "0.6rem",
//                         }}
//                       >
//                         9
//                       </span>
//                     </li>
//                   </span>
//                 </ul>
//               </div>
//             </span>
//           </div>
//         </Box>
//       </Box>
//     </section>
//   );
// }


import React from 'react'

function Riskchart() {
  return (
    <div>Riskchart</div>
  )
}

export default Riskchart
