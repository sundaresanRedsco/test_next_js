import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { DoneRounded } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSignUpStore } from "@/store/useSignUpStore";

type Props = {
  steps: any;
  variant?: "slider";
};
const defaultStyle = (isActive: boolean, theme: any) => {
  return {
    "&.MuiStepper-root ": {
      width: "100% ",
    },
    "& .MuiStepConnector-root": {
      margin: "0px 10px",
      "@media (min-width: 2120px)": {
        margin: "0px 25px",
      },
      width: "2px",
    },
    "& .MuiStepConnector-line": {
      borderWidth: "1px",
      borderColor: theme.apiTrail.onboarding.StepperConnector,
      marginRight: { lg: 0, md: 0, sm: 0, xs: "30px" },
      minHeight: "17px",
      "@media (min-width: 2120px)": {
        marginRight: 0,
        minHeight: "45px",
      },
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: theme.apiTrail.onboarding.StepperConnector,
    },

    "& .MuiStepLabel-label.Mui-active": {
      color: isActive
        ? theme.apiTrail.onboarding.Primary
        : theme.apiTrail.onboarding.Border,
    },
    marginTop: { sm: 7, md: 0, lg: 5 },
  };
};
const smallScreenStyle = (isSlider: boolean, theme: any) => {
  return {
    width: "100%",
    "& .MuiStepConnector-root": {
      margin: "auto",
    },
    "& .MuiStepConnector-line": {
      borderWidth: isSlider ? 0 : "3px",
      borderColor: theme.apiTrail.onboarding.StepperConnector,
      width: "100%",

      marginRight: isSlider ? 0 : "30px",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: theme.apiTrail.onboarding.StepperConnector,
    },
    "& .Mui-active": {
      fontWeight: "bold",
      transition: ".6s",
    },

    "& .MuiStepLabel-label.Mui-active": {
      color: theme.apiTrail.onboarding.Primary,
    },
  };
};
const defaultButtonStyle = (activeStep: number, index: number, theme: any) => {
  return {
    "& .MuiStepLabel-label": {
      color:
        activeStep >= index
          ? theme.apiTrail.onboarding.Primary
          : theme.apiTrail.onboarding.Border,
      fontFamily: activeStep == index ? "FiraSans-medium" : "FiraSans-regular",
      fontSize: "12px",
      "@media (min-width: 2120px)": {
        fontSize: "25px",
      },
    },
    "& .MuiStepLabel-root": {
      width: "100%",
    },
  };
};
const smallScreenButtonStyle = (
  activeStep: number,
  index: number,
  theme: any
) => {
  return {
    "& .MuiStepLabel-label": {
      color:
        activeStep == index
          ? theme.apiTrail.onboarding.Primary
          : theme.apiTrail.onboarding.Border,
      fontFamily: "FiraSans !important",
      fontSize: "12px",
    },
    "& .MuiStepLabel-iconContainer": {
      paddingRight: 0,
      marginLeft: "30px",
    },
    padding: 0,
  };
};
export const StepperIcon = ({
  isActive,
  icon,
  isCompleted,
  variant,
  sx,
}: any) => {
  const theme = useTheme();
  return (
    <>
      {/* {variant == "slider" ? (
        isCompleted || isActive ? (
          <ActiveStepperBar />
        ) : (
          <StepperBar />
        )
      ) : ( */}
      <Box
        sx={{
          color:
            isActive || isCompleted
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.Primary,
          background: isCompleted
            ? theme.apiTrail.onboarding.StepperIconComplete
            : isActive
            ? theme.apiTrail.onboarding.StepperIconActive
            : theme.apiTrail.onboarding.StepperIconDefault,
          padding: "5px",
          height: "20px",
          width: "20px",
          transition: ".5s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
          "@media (min-width: 2120px)": {
            height: "50px",
            width: "50px",
            borderRadius: "10px",
          },
          ...sx,
          transision: ".3s",
        }}
      >
        {isCompleted ? (
          <DoneRounded
            sx={{
              fontSize: "15px",
              "@media (min-width: 2120px)": {
                fontSize: "25px",
              },
            }}
          />
        ) : (
          icon
        )}
      </Box>
      {/* )} */}
    </>
  );
};
export default function OnboardingStepper({ steps, variant }: Props) {
  const { activeStep, formDataStore } = useSignUpStore();

  const theme = useTheme();
  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const isxl = useMediaQuery(theme.breakpoints.only("xl"));
  const showLabel = variant != "slider" && !isxs;
  const isActive = formDataStore?.currentPage != "Login";
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: { xs: 2, sm: 0 },
      }}
    >
      <Stepper
        orientation={isxs || variant == "slider" ? "horizontal" : "vertical"}
        sx={
          isxs || variant == "slider"
            ? smallScreenStyle(variant == "slider", theme)
            : defaultStyle(isActive, theme)
        }
        nonLinear
      >
        {steps?.map((elem: any, index: number) => (
          <Step key={index}>
            <StepButton
              sx={
                isxs
                  ? smallScreenButtonStyle(activeStep, index, theme)
                  : defaultButtonStyle(activeStep, index, theme)
              }
              icon={
                <StepperIcon
                  variant={variant}
                  icon={elem.icon}
                  isActive={activeStep == index && isActive}
                  isCompleted={index == 0 || index < activeStep}
                />
              }
            >
              {/* {showLabel && elem?.label} */}
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {showLabel && elem?.label}
                <Box
                  sx={{
                    fontSize: { lg: "8px", sm: ".456rem" },
                    position: "absolute",
                    bottom: -15,
                    width: "100%",
                    color:
                      activeStep == index && isActive
                        ? theme.apiTrail.onboarding.StepperTextActive
                        : theme.apiTrail.onboarding.StepperTextPrimary,
                    fontWeight: 400,
                    fontFamily: "FiraSans-regular",
                    "@media (min-width: 2120px)": {
                      fontSize: "18px",
                      bottom: -30,
                    },
                  }}
                >
                  {showLabel && elem?.description}
                </Box>
              </span>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
