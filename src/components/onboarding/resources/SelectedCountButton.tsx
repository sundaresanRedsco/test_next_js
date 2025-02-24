// import { translate } from "@/app/Helpers/helpersFunctions";
// import {
//   PrimarySignInUPTypography,
//   TertiarySignInUPTypography,
// } from "@/app/Styles/signInUp";
import theme from "@/theme/theme";
import { Box } from "@mui/material";
import React from "react";

type Props = { count: number };

export default function SelectedCountButton({ count }: Props) {
  return (
    // <Box
    //   sx={{
    //     background: theme.palette.sigInUpButtonPrimary.main,
    //     border: `1.5px solid ${theme.palette.sigInUpButtonBorder.main} `,
    //     borderRadius: "7px",
    //     minWidth: "100px",
    //     height: "30px",
    //     color: theme.palette.signInUpPrimary.main,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     gap: "3px",
    //     textAlign: "end",
    //     "@media (min-width: 2120px)": {
    //       height: "40px",
    //       minWidth: "150px",
    //     },
    //   }}
    // >
    //   <PrimarySignInUPTypography
    //     sx={{
    //       color: theme.palette.signInUpPrimary.main,
    //       fontSize: "13px",
    //       "@media (min-width: 2120px)": {
    //         fontSize: "20px",
    //       },
    //     }}
    //   >
    //     {count}
    //   </PrimarySignInUPTypography>
    //   <TertiarySignInUPTypography
    //     sx={{
    //       color: theme.palette.signInUpPrimary.main,
    //       fontSize: "10px",
    //       "@media (min-width: 2120px)": {
    //         fontSize: "18px",
    //       },
    //     }}
    //   >
    //     {translate("common.SELECTED")}
    //   </TertiarySignInUPTypography>
    // </Box>
    <></>
  );
}
