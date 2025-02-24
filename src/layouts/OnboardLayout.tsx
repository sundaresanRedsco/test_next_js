import { Box, Container, Stack, useTheme } from "@mui/material";
import React from "react";
import { globalTranslate } from "@/helpers/helpersFunctions";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import { useSignUpStore } from "@/store/useSignUpStore";
import useMuiBreakpoints from "@/hooks/useMuiBreakpoints";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import OnboardingTypography from "@/components/onboarding/OnboardingTypography";

type Props = {
  children: any;
  steps: any;
  isWorkflowModal?: boolean;
};

export default function OnBoardLayout({
  children,
  steps,
  isWorkflowModal,
}: Props) {
  const { activeStep, handleBack, formDataStore } = useSignUpStore();
  const theme = useTheme();
  const { isxs } = useMuiBreakpoints();
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isWorkflowModal ? "100%" : "85vh",
        width: "100%",
        position: "relative",
        background: {
          xs: isWorkflowModal
            ? theme.apiTrail.onboarding.SecondaryBackground
            : "none",
        },
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          padding:
            isxs || isWorkflowModal
              ? "0px !important"
              : { xl: "0px 110px !important", sm: "0px 90px !important" },
          height: isWorkflowModal || isxs ? "100%" : "80vh",

          "@media (min-width: 1400px)": {
            maxWidth: isWorkflowModal ? "100%" : "93%",
          },
          "@media (min-width: 2120px)": {
            maxWidth: isWorkflowModal ? "100%" : "88%",
          },
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            background: {
              xs: "none",
              sm: isWorkflowModal
                ? theme.apiTrail.onboarding.SecondaryBackground
                : theme.apiTrail.onboarding.Background,
            },
            borderRadius: "20px",
            height: activeStep == 0 && !isWorkflowModal ? "100%" : "auto",

            overflow: { xs: "auto", sm: "hidden" },
            display: "flex",
            alignItems: "center",
            width: "100%",

            flexDirection: { xs: "column", sm: "row" },
            position: "relative",
            "@media (min-width: 2120px)": {
              borderRadius: "30px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: { xs: "auto", sm: "100%", md: "100%" },
              width: {
                xs: "100%",
                sm: "310px",
                md: "40%",
                lg: "28%",
                xl: "28%",
              },
              position: "relative",
              justifyContent: { xs: "flex-start", sm: "space-between" },
              padding: {
                xs: "24px 24px 0 24px",
                sm: 3,
              },
              background: {
                xs: "none",
                sm: theme.apiTrail.onboarding.StepperContainerBg,
              },
              borderRadius: "20px 0 0 20px",
              flexDirection: "column",
              transition: ".5s ease",
              alignItems: "center",
            }}
          >
            <Box
              component={"img"}
              src={"/sign/signup-styled-layer.png"}
              alt="Apiflow-signUp"
              style={{
                top: 0,
                left: 0,
                position: "absolute",
                width: "100%",
              }}
            />
            <OnboardingTypography
              text={globalTranslate("common.LOGO", "onboardingConstants")}
              color={theme.apiTrail.onboarding.sideBarTitle}
              fontWeight="lg"
              variant="md"
            />
            <OnboardingStepper steps={steps} />
            {formDataStore?.currentPage != "Login" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: { xs: 2, sm: 0 },
                }}
              >
                {activeStep > 0 && (
                  <OnboardingButton
                    disabled={
                      isWorkflowModal
                        ? activeStep == 2
                        : activeStep == 5
                        ? activeStep == 5 && formDataStore?.invite_token
                        : activeStep == 3 || activeStep == 1
                    }
                    text={
                      `${globalTranslate(
                        "button.BACK_TO",
                        "onboardingConstants"
                      )} ` + steps[activeStep - 1]?.label
                    }
                    onClick={handleBack}
                  />
                )}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "inherit",
              height: "100%",
              padding: { xs: "10px", md: 0 },
            }}
          >
            {children}
          </Box>
        </Box>
        {/* {!isWorkflowModal && (
          <Box
            sx={{
              width: "100%",
              height: "60px",
              position: "absolute",
              bottom: -70,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "310px",
                  md: "40%",
                  lg: "28%",
                  xl: "28%",
                },
              }}
            ></Box>
            {formDataStore?.currentPage != "Login" && (
              <Box
                sx={{
                  width: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <SignUPStepper steps={steps} variant="slider" />
                </Box>
              </Box>
            )}
          </Box>
        )} */}
      </Container>
    </Stack>
  );
}
