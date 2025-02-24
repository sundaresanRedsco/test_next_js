"use client";
import RightArrowSvg from "@/assests/svgs/global/RightArrowSvg";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import OnboardingTypography from "@/components/onboarding/OnboardingTypography";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { globalTranslate } from "@/helpers/helpersFunctions";
import { Stack, useTheme } from "@mui/material";

import React from "react";

type Props = {};

export default function WelcomePage({}: Props) {
  const theme = useTheme();
  return (
    <OnboardingWrapper>
      <></>
      {/* <Stack
        sx={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <OnboardingTypography
          text={globalTranslate("heroSection.TITLE", "onboardingConstants")}
          fontSize={globalTranslate("fontSize.xl1", "signInUpStyleConstants")}
          color={theme.apiTrail.onboarding.PrimaryText}
          fontWeight="lg"
        />

        <OnboardingTypography
          text={globalTranslate(
            "heroSection.DESCRIPTION",
            "onboardingConstants"
          )}
          fontSize={globalTranslate("fontSize.xs1", "signInUpStyleConstants")}
          color={theme.apiTrail.onboarding.SecondaryText}
          fontWeight="sm"
        />
        <div className="w-64 mt-5">
          <OnboardingButton
            sx={{
              fontSize: {
                xl: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
                xs: globalTranslate("fontSize.xs2", "signInUpStyleConstants"),
              },
            }}
            onClick={() => {}}
            text={globalTranslate("heroSection.BUTTON", "onboardingConstants")}
            endIcon={<RightArrowSvg />}
          />
        </div>
      </Stack> */}
    </OnboardingWrapper>
  );
}
