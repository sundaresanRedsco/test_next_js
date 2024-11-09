"use client";

import React from "react";
import { styled, keyframes } from "@mui/system";
import { Backdrop, Typography } from "@mui/material";

const loaderAnimation = keyframes({
  "0%": { left: "-100px" },
  "100%": { left: "110%" },
});

const animateAnimation = keyframes({
  "17%": { borderBottomRightRadius: "3px" },
  "25%": { transform: "translateY(9px) rotate(22.5deg)" },
  "50%": {
    transform: "translateY(18px) scale(1,.9) rotate(45deg)",
    borderBottomRightRadius: "40px",
  },
  "75%": { transform: "translateY(9px) rotate(67.5deg)" },
  "100%": { transform: "translateY(0) rotate(90deg)" },
});

const shadowAnimation = keyframes({
  "50%": { transform: "scale(1.2,1)" },
});

const LoaderContainer = styled("div")({
  /* Uncomment this to make it run! */
  /* animation: `${loaderAnimation} 5s linear infinite`, */
  position: "absolute",
  top: "calc(50% - 20px)",
  left: "calc(50% - 20px)",
});

const BoxContainer = styled("div")({
  width: "50px",
  height: "50px",
  background: "#fff",
  animation: `${animateAnimation} 0.5s linear infinite`,
  position: "absolute",
  top: 0,
  left: 0,
  borderRadius: "3px",
});

const Shadow = styled("div")({
  width: "50px",
  height: "5px",
  background: "#000",
  opacity: 0.1,
  position: "absolute",
  top: "59px",
  left: 0,
  borderRadius: "50%",
  animation: `${shadowAnimation} 0.5s linear infinite`,
});

// color: ${({ theme }) => theme.palette.primaryWhite.main};
const HeadingTypography = styled(Typography)`
  font-family: Firasans-regular;
  color: white;
  font-weight: 900;
  position: absolute;
  top: 55%;
`;
const GlobalLoader = () => {
  return (
    <Backdrop sx={{ zIndex: 99999 }} open={true}>
      <LoaderContainer>
        <BoxContainer></BoxContainer>
        <Shadow></Shadow>
      </LoaderContainer>
      <HeadingTypography sx={{ marginTop: "20px" }}>
        loading...
      </HeadingTypography>
    </Backdrop>
  );
};

export default GlobalLoader;

// import {
//   Backdrop,
//   Box,
//   Container,
//   LinearProgress,
//   Typography,
//   styled,
// } from "@mui/material";
// import theme from "../../Theme/theme";
// import React from "react";

// const LoaderCon = styled(Box)`
//   width: 60%;
//   margin: auto;
//   background: ${({ theme }) => theme.palette.mainWhite.main};
//   border-radius: 5px;
// `;

// const LoaderBox = styled(Box)`
//   width: 150px;
//   border: 0.4rem solid ${({ theme }) => theme.palette.mainGreen.main};
//   border-radius: 13px;
//   padding: 5px;
// `;

// const HeadingTypography = styled(Typography)`
//   font-family: Inter-Regular !important;
//   color: ${({ theme }) => theme.palette.primaryBlack.main};
//   font-weight: 900;
// `;
// const CaptionTypography = styled(Typography)`
//   color: ${({ theme }) => theme.palette.primaryBody.main};
//   font-size: 0.65rem;
//   font-style: italic;
//   text-align: center;
// `;
// export default function GLobalLoader() {
//   const [value, setValue] = React.useState<number>(25);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       if (value === 100) {
//         setValue(0);
//       } else {
//         setValue(value + 25);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [value]);
//   return (
//     <section className="loader">
//       <Backdrop sx={{ zIndex: 9999 }} open={true}>
//         <Container>
//           <LoaderCon className="p-3">
//             {/* <HeadingTypography>
//               Importing is in Progress ,please wait
//             </HeadingTypography> */}

//             <HeadingTypography>Loading ,please wait...</HeadingTypography>
//             <Box my={3}>
//               <Box className="d-flex justify-content-center">
//                 <LoaderBox>
//                   <LinearProgress
//                     variant="determinate"
//                     value={value}
//                     sx={{
//                       backgroundColor: theme.palette.mainWhite.main,
//                       height: "18px",
//                       borderRadius: "5px",
//                       // ".css-t752vm": {
//                       //   backgroundColor: theme.palette.mainGreen.main +"!important",
//                       // },
//                       ".MuiLinearProgress-bar": {
//                         backgroundColor: theme.palette.mainGreen.main,
//                       },
//                     }}
//                   />
//                 </LoaderBox>
//               </Box>
//               {/* <CaptionTypography mt={2}>
//                 Step 2 Removing unused layers
//               </CaptionTypography> */}
//             </Box>
//           </LoaderCon>
//         </Container>
//       </Backdrop>
//     </section>
//   );
// }
