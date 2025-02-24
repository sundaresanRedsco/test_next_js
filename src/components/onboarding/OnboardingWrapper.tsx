import LogoWhite from "@/assests/svgs/signInUp/LogoWhite";
import { Box, useTheme } from "@mui/material";
import React from "react";
import OnboardingTypography from "./OnboardingTypography";
import { globalTranslate } from "@/helpers/helpersFunctions";
import InfoSvg from "@/assests/svgs/onboard/InfoSvg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

type Props = {
  children: React.ReactNode;
};

export default function OnboardingWrapper({ children }: Props) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <></>
    // <Box
    //   sx={{
    //     height: "100vh",
    //     background: "url(/global/Bg.png)",
    //     width: "100%",
    //     overflow: "hidden",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       width: "100%",
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       backgroundColor: theme.apiTrail.onboarding.TopBarBg,
    //       padding: { xs: 2, xl: 3 },
    //       paddingX: { xs: 4, xl: 5 },
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         color: theme.apiTrail.onboarding.PrimaryText,
    //         svg: {
    //           width: "50px",
    //           height: "50px",
    //         },
    //       }}
    //       className="flex items-center gap-2"
    //     >
    //       <LogoWhite />
    //       <OnboardingTypography
    //         text={globalTranslate("LOGO", "onboardingConstants")}
    //         // variant="lg"
    //         fontSize={{
    //           xl: globalTranslate("fontSize.lg", "signInUpStyleConstants"),
    //           xs: globalTranslate("fontSize.md", "signInUpStyleConstants"),
    //         }}
    //         color={theme.apiTrail.onboarding.PrimaryText}
    //         fontWeight="lg"
    //       />
    //     </Box>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         svg: {
    //           width: {
    //             xs: "25px",
    //             xl: "30px",
    //           },
    //           height: {
    //             xs: "25px",
    //             xl: "30px",
    //           },
    //         },
    //       }}
    //     >
    //       <InfoSvg />
    //       <Box
    //         sx={{
    //           borderLeft: "1px solid" + theme.apiTrail.onboarding.PrimaryText,
    //           pl: 2,
    //           ml: 2,
    //           cursor: "pointer",
    //         }}
    //         onClick={() => {
    //           router.push(ROUTES.SIGNIN);
    //         }}
    //       >
    //         <OnboardingTypography
    //           text={globalTranslate("SIGN_OUT", "onboardingConstants")}
    //           variant="sm"
    //           color={theme.apiTrail.onboarding.PrimaryText}
    //           fontWeight="lg"
    //         />
    //       </Box>
    //     </Box>
    //   </Box>
    //   <Box
    //     sx={{
    //       width: "100%",
    //       height: "80vh",
    //       // display: "flex",
    //       // flexDirection: "row",
    //       // justifyContent: "space-between",
    //       // alignItems: "center",
    //       // padding: 3,
    //     }}
    //   >
    //     {children}
    //   </Box>
    // </Box>
  );
}
