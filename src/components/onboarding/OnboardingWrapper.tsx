import LogoWhite from "@/assests/svgs/signInUp/LogoWhite";
import { Box } from "@mui/material";
import React from "react";
import OnboardingTypography from "./OnboardingTypography";
import theme from "@/theme/theme";
import { globalTranslate } from "@/helpers/helpersFunctions";

type Props = {
  children: React.ReactNode;
};

export default function OnboardingWrapper({ children }: Props) {
  return (
    <Box
      sx={{ height: "100vh", background: "url(/global/Bg.png)", width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.apiTrail.onboarding.TopBarBg,
          padding: 3,
        }}
      >
        <div
          style={{
            color: theme.apiTrail.onboarding.PrimaryText,
          }}
          className="flex flex-row justify-between items-center gap-2"
        >
          <LogoWhite size={50} />
          <OnboardingTypography
            text={globalTranslate("LOGO", "onboardingConstants")}
            variant="lg"
            color={theme.apiTrail.onboarding.PrimaryText}
            fontWeight="lg"
          />
        </div>
        <OnboardingTypography
          text={globalTranslate("SIGN_OUT", "onboardingConstants")}
          variant="sm"
          color={theme.apiTrail.onboarding.PrimaryText}
          fontWeight="lg"
          sx={{
            cursor: "pointer",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
